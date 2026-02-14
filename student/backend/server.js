const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const multer = require("multer");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: "*" }
});

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

const db = require("./db");

setInterval(() => {
    db.query(
        `DELETE FROM sticky_notes
         WHERE deleted_at IS NOT NULL
         AND deleted_at < NOW() - INTERVAL 24 HOUR`
    );
}, 60 * 60 * 1000); // runs every 1 hour


/*chat*/
const chatRoutes = require("./routes/chat");
app.use("/chat", chatRoutes);



const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  }
});

const upload = multer({ storage });


app.get("/chat/:studentId/:teacherId", (req, res) => {
  const { studentId, teacherId } = req.params;

  db.query(
    `SELECT * FROM messages 
     WHERE (sender_id=? AND receiver_id=?)
     OR (sender_id=? AND receiver_id=?)
     ORDER BY created_at ASC`,
    [studentId, teacherId, teacherId, studentId],
    (err, result) => {
      res.json(result);
    }
  );
});


io.on("connection", (socket) => {

  socket.on("joinRoom", (room) => {
    socket.join(room);
  });

  socket.on("sendMessage", (data) => {

    db.query(
      "INSERT INTO messages (sender_id,sender_role,receiver_id,message,file) VALUES (?,?,?,?,?)",
      [data.sender_id, data.sender_role, data.receiver_id, data.message, data.file],
      () => {
        io.to(data.room).emit("receiveMessage", data);
      }
    );
  });

  socket.on("typing", (room) => {
    socket.to(room).emit("typing");
  });

  socket.on("seen", (msgId) => {
    db.query("UPDATE messages SET seen=1 WHERE id=?", [msgId]);
  });

});
server.listen(3000, () => {
  console.log("Server running on port 3000");
});
