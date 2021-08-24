import express from 'express';
import {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
} from '../controllers/toursController.js';

const router = express.Router();

// router.param('id', tourController.checkID)

router.route('/').get(getAllTours).post(createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

export default router;
