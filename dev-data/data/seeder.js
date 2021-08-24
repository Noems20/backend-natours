import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from '../../config/db.js';

// Data
import tours from './tours-simple.js';

// Model Schemas
import Tour from '../../models/tourModel.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Tour.deleteMany();

    // const sampleTours = tours.map((tour) => {
    //   return { ...tour };
    // });

    await Tour.insertMany(tours);

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
