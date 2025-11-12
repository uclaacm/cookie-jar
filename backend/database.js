// database.js
import mongoose from "mongoose"
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI;


async function connectDB() {
  try {
    await mongoose.connect(uri);
    console.log("can start filling da jar");
  } catch (error) {
    console.error("the jar broke", error);
    process.exit(1);
  }
}

const client = new MongoClient(uri);
await client.connect();

export { client, connectDB };