import express from "express";
import bcrypt from "bcrypt";
import { client } from "../database.js"; 

const router = express.Router();

const db = client.db("cookiejar");
const usersCollection = db.collection("users");

router.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if all required fields are provided
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if the user already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User with this email already exists" });
    }

    // Hash the password using bcrypt with 10 salt rounds
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create the user object
    const user = { firstName, lastName, email, password: hashedPassword, level: 0 };

    // Insert the new user into the collection
    const result = await usersCollection.insertOne(user);

    res.status(201).json({
      message: "User signed up successfully",
      userId: result.insertedId
    });
  } catch (error) {
    console.error("Error signing up user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;