import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from '../../config/db.js';

// Data
import tours from './tours.js';
import users from './users.js';
import reviews from './reviews.js';

// Model Schemas
import Tour from '../../models/tourModel.js';
import User from '../../models/userModel.js';
import Review from '../../models/reviewModel.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();

    // const sampleTours = tours.map((tour) => {
    //   return { ...tour };
    // });

    await Tour.create(tours);
    await User.create(users, { validateBeforeSave: false });
    await Review.create(reviews);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
