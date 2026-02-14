const express = require("express");
const router = express.Router();
const db = require("../db");

/* GET ALL TEACHERS */
router.get("/teachers", (req, res) => {
  db.query("SELECT * FROM teachers", (err, result) => {
    res.json(result);
  });
});

/* GET MESSAGES */
router.get("/messages/:teacherId", (req, res) => {
  const teacherId = req.params.teacherId;

  db.query(
    "SELECT * FROM messages WHERE teacher_id=? ORDER BY created_at ASC",
    [teacherId],
    (err, result) => {
      res.json(result);
    }
  );
});

/* SEND MESSAGE */
router.post("/send", (req, res) => {
  const { student_id, teacher_id, message } = req.body;

  db.query(
    "INSERT INTO messages (student_id, teacher_id, sender, message) VALUES (?, ?, 'student', ?)",
    [student_id, teacher_id, message],
    () => {
      res.json({ success: true });
    }
  );
});

module.exports = router;
