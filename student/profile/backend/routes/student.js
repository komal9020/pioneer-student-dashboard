const express = require("express");
const router = express.Router();
const db = require("../db");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  }
});

const upload = multer({ storage });

/* LOGIN */
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM students WHERE email=? AND password=?",
    [email, password],
    (err, result) => {
      if (result.length > 0) {
        res.json({ success: true });
      } else {
        res.json({ success: false });
      }
    }
  );
});

/* GET PROFILE */
router.get("/profile", (req, res) => {
  db.query("SELECT * FROM students LIMIT 1", (err, result) => {
    res.json(result[0]);
  });
});

/* FULL UPDATE (Update Profile Page) */
router.post("/update-full", upload.single("photo"), (req, res) => {
  const { name, email, password, className, classCode } = req.body;
  const photo = req.file ? req.file.filename : req.body.oldPhoto;

  db.query(
    `UPDATE students SET 
      name=?, email=?, password=?, class=?, class_code=?, photo=?
     WHERE id=1`,
    [name, email, password, className, classCode, photo],
    () => res.json({ success: true })
  );
});

/* LIMITED UPDATE (Dashboard Profile Edit) */
router.post("/update-limited", upload.single("photo"), (req, res) => {
  const { name, email } = req.body;
  const photo = req.file ? req.file.filename : req.body.oldPhoto;

  db.query(
    `UPDATE students SET 
      name=?, email=?, photo=?
     WHERE id=1`,
    [name, email, photo],
    () => res.json({ success: true })
  );
});

module.exports = router;
