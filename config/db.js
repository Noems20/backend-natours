import mongoose from 'mongoose';

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then((conn) =>
      console.log(`Mongo DB Connected: ${conn.connection.host}`.cyan.underline)
    );
};
// console.error(`Error: ${error.message}`.red.underline.bold);
// process.exit(1);
export default connectDB;
