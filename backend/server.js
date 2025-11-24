import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './database.js';
import userRoutes from './routes/userRoutes.js';
import stageRoutes from './routes/stageRoutes.js';
import cookieRoutes from './routes/cookieRoutes.js';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

connectDB();

// Mount routes
app.use('/api/users', userRoutes);
app.use('/api/stages', stageRoutes);
app.use('/api/cookies', cookieRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
