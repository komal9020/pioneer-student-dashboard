const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/sticky-notes", require("./routes/stickyNotes"));

app.listen(3000, () => {
    console.log("Backend running at http://localhost:3000");
});
const db = require("./db");

setInterval(() => {
    db.query(
        `DELETE FROM sticky_notes
         WHERE deleted_at IS NOT NULL
         AND deleted_at < NOW() - INTERVAL 24 HOUR`
    );
}, 60 * 60 * 1000); // runs every 1 hour
