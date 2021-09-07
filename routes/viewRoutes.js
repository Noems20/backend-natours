import express from 'express';

// Controllers
import {
  getOverview,
  getTour,
  getLoginForm,
} from '../controllers/viewsController.js';

import { isLoggedIn } from '../controllers/authController.js';

const router = express.Router();

router.use(isLoggedIn);

router.get('/', getOverview);
router.get('/tour/:slug', getTour);
router.get('/login', getLoginForm);

export default router;
