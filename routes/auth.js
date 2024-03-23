const express = require('express');
const bcrypt = require('bcrypt');
const { connect_to_database } = require('../db/db');
const router = express.Router();
const db = require('../db/db');

router.post("/signup", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Check if both username and password are provided
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    try {
        const database = await db.connect_to_database();
        const userCollection = database.collection("users");
        
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user
        await userCollection.insertOne({ username, password: hashedPassword });
        res.status(200).json({ message: "User created!" });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    try {
        const database = await db.connect_to_database();
        const userCollection = database.collection("users");

        const user = await userCollection.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        res.status(200).json({ message: "Login successful" });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
