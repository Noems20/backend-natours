import express from 'express';

// Controllers
import { getOverview, getTour } from '../controllers/viewsController.js';

const router = express.Router();

router.get('/', getOverview);

router.get('/tour/:slug', getTour);

export default router;
