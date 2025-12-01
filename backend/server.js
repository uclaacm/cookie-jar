import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./database.js";
import userRoutes from "./routes/userRoutes.js";
import cookieRoutes from "./routes/cookieinfoRoutes.js";


dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());


const startServer = async() => {
  try{
    await connectDB();
    console.log("connected to server");
  app.use("/api/users", userRoutes);
  app.use("/api/cookies", cookieRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
}catch(err) {
  console.error("failed to start server:", err);
}};

startServer();