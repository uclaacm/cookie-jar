import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './database.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

connectDB();

// // Mount user routes
app.use('/api/users', userRoutes);

// more endpoints

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
