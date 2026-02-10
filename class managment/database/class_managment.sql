CREATE DATABASE class_management;
USE class_management;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role ENUM('student','teacher') NOT NULL,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    address TEXT,
    gender ENUM('male','female','other'),
    profile_photo VARCHAR(255)
);

INSERT INTO users (role,name,email,password) VALUES
(
'student',
'Student User',
'student2026@gmail.com',
'$2b$10$Zf0wZ1p3jZzAqFf9uT9dWOVkKfZC6bIY5jF2bE2wZ6HkP0p7kU5n2'
),
(
'teacher',
'Teacher User',
'teacher5050@gmail.com',
'$2b$10$w9zE9d9V0n9d5j3V5Yw9Ue2j8L9r9MZ2qD9pF5T7nY2zQ6pA3s2pK'
);
