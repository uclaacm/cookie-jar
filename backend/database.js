// database.js
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function connectDB() {
  try {
    await client.connect();
    console.log("can start filling da jar");
  } catch (error) {
    console.error("the jar broke", error);
    process.exit(1);
  }
}

export { client, connectDB };