import express from "express";
import bcrypt from "bcrypt";
import { client } from "../database.js"; 

const router = express.Router();

const db = client.db("cookiejar");
const usersCollection = db.collection("users");


// POST login endpoint

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if all required fields are provided
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Check if the user exists
    const existingUser = await usersCollection.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Return user data (excluding password)
    return res.status(200).json({
      message: "Login successful",
      user: {
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
        email: existingUser.email,
        level: existingUser.level,
        timestamp: existingUser.timestamp
      }
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "An error occurred during login" });
  }
});


// POST signup endpoint

router.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if all required fields are provided
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if the user already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already registered" });
    }

    // Hash the password using bcrypt with 10 salt rounds
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create the user object
    const user = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      level: 0,
      timestamp: Date.now()
    };

    // Insert the new user into the collection
    const result = await usersCollection.insertOne(user);

    return res.status(201).json({
      message: "User registered successfully",
      userId: result.insertedId
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "An error occurred during registration" });
  }
});

export default router;