import mongoose from 'mongoose';
import Tour from './tourModel.js';

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review can not be empty'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'Review must belong to a tour'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.index(
  { tour: 1, user: 1 },
  {
    unique: true,
  }
);

reviewSchema.pre(/^find/, function (next) {
  // this.populate('tour', '-guides name');
  this.populate('user', 'name photo');
  next();
});

reviewSchema.statics.calcAverageRating = async function (tourId) {
  // this -> Current model (Tour)
  const stats = await this.aggregate([
    {
      $match: { tour: tourId },
    },
    {
      $group: {
        _id: '$tour',
        numRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);

  if (stats.length > 0) {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: stats[0].numRating,
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5,
    });
  }
};

reviewSchema.post('save', function () {
  // This points to current review (Document), this.constructor points to model
  this.constructor.calcAverageRating(this.tour);
});

// findByIdAndUpdate
// findByIdAndDelete
reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.findOne(); // this is a query with find can access the document
  next();
});

reviewSchema.post(/^findOneAnd/, async function () {
  // await this.findOne(); Does NOT work here, query has already executed
  await this.r.constructor.calcAverageRating(this.r.tour);
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;
