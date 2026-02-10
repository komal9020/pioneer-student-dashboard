const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

app.use("/student", require("./routes/student"));

app.listen(3000, () =>
  console.log("Server running on http://localhost:3000")
);
