import express from 'express';
import colors from 'colors';

// Utils
import AppError from './utils/appError.js';

// Controlers
import globalErrorHandler from './controllers/errorController.js';

// Routers
import tourRouter from './routes/tourRoutes.js';
import userRouter from './routes/userRoutes.js';

process.on('uncaughtException', (err) => {
  console.log('UNHANDLED EXCEPTION! Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  //   const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  //   err.status = 'fail';
  //   err.statusCode = 404;

  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
