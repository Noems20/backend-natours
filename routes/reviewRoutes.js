import express from 'express';

import {
  getAllReviews,
  createReview,
  deleteReview,
  updateReview,
  setTourUserIds,
  checkIfAuthor,
  getReview,
} from '../controllers/reviewController.js';

import { protect, restrictTo } from '../controllers/authController.js';

const router = express.Router({ mergeParams: true });

router.use(protect);

router
  .route('/')
  .get(getAllReviews)
  .post(restrictTo('user'), setTourUserIds, createReview);

router
  .route('/:id')
  .get(getReview)
  .patch(restrictTo('user', 'admin'), checkIfAuthor, updateReview)
  .delete(restrictTo('user', 'admin'), checkIfAuthor, deleteReview);

export default router;
