const express = require("express");
const router = express.Router();
const db = require("../db");

/* =========================
   GET ALL ACTIVE NOTES
========================= */
router.get("/", (req, res) => {
    db.query(
        `SELECT id, subject, message, color, created_at
         FROM sticky_notes
         WHERE deleted_at IS NULL
         ORDER BY id DESC`,
        (err, rows) => {
            if (err) {
                console.error(err);
                return res.status(500).json(err);
            }
            res.json(rows);
        }
    );
});

/* =========================
   ADD NEW NOTE
========================= */
router.post("/", (req, res) => {
    const { subject, message, color, posted_by } = req.body;

    db.query(
        `INSERT INTO sticky_notes (subject, message, color, posted_by)
         VALUES (?, ?, ?, ?)`,
        [subject, message, color, posted_by],
        (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json(err);
            }
            res.json({ success: true });
        }
    );
});

/* =========================
   SOFT DELETE NOTE (24h)
========================= */
router.delete("/:id", (req, res) => {
    db.query(
        `UPDATE sticky_notes
         SET deleted_at = NOW()
         WHERE id = ?`,
        [req.params.id],
        (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json(err);
            }
            res.json({ success: true });
        }
    );
});

module.exports = router;
