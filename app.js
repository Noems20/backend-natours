import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js';

// Routers
import tourRouter from './routes/tourRoutes.js';
import userRouter from './routes/userRoutes.js';

dotenv.config();

connectDB();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

export default app;
