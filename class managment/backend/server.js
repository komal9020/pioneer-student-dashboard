const express = require('express');
const mysql = require('mysql2');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'class_management'
});

// Multer for profile photo uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = './uploads';
        if (!fs.existsSync(dir)) fs.mkdirSync(dir);
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });


// LOGIN with history tracking
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    db.query('SELECT * FROM users WHERE email=? AND password=?', [email, password], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        if (result.length === 0) return res.status(401).json({ error: 'Invalid credentials' });

        const userId = result[0].id;

        // Insert login record
        db.query('INSERT INTO login_history (user_id) VALUES (?)', [userId], (err) => {
            if (err) console.error('Login history insert error:', err); 
            // ignore error so login still works
            res.json({ userId });
        });
    });
});

// GET USER DATA
app.get('/user/:id', (req, res) => {
    const userId = req.params.id;
    db.query('SELECT * FROM users WHERE id=?', [userId], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        if (result.length === 0) return res.status(404).json({ error: 'User not found' });
        res.json(result[0]);
    });
});

// UPDATE USER
app.put('/update/:id', upload.single('profile_photo'), (req, res) => {
    const userId = req.params.id;
    const { name, email, password, gender, className } = req.body;
    const photo = req.file ? req.file.filename : null;

    // Get existing photo if no new photo uploaded
    db.query('SELECT profile_photo FROM users WHERE id=?', [userId], (err, result) => {
        if (err) return res.status(500).json({ error: err });

        const existingPhoto = result[0].profile_photo;
        const finalPhoto = photo || existingPhoto;

        db.query(
            'UPDATE users SET name=?, email=?, password=?, gender=?, class=?, profile_photo=? WHERE id=?',
            [name, email, password, gender, className, finalPhoto, userId],
            (err) => {
                if (err) return res.status(500).json({ error: err });
                // Return updated user
                db.query('SELECT * FROM users WHERE id=?', [userId], (err, updatedResult) => {
                    if (err) return res.status(500).json({ error: err });
                    res.json({ message: 'Profile updated!', user: updatedResult[0] });
                });
            }
        );
    });
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
