import express from 'express';

import {
  getAllReviews,
  createReview,
  deleteReview,
  updateReview,
  setTourUserIds,
  getReview,
} from '../controllers/reviewController.js';

import { protect, restrictTo } from '../controllers/authController.js';

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(getAllReviews)
  .post(protect, restrictTo('user'), setTourUserIds, createReview);

router
  .route('/:id')
  .get(getReview)
  .patch(updateReview)
  .delete(protect, restrictTo('admin'), deleteReview);

export default router;
