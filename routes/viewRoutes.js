import express from 'express';

// Controllers
import {
  getOverview,
  getTour,
  getLoginForm,
  getAccount,
} from '../controllers/viewsController.js';

import { isLoggedIn, protect } from '../controllers/authController.js';

const router = express.Router();

router.get('/', isLoggedIn, getOverview);
router.get('/tour/:slug', isLoggedIn, getTour);
router.get('/login', isLoggedIn, getLoginForm);
router.get('/me', protect, getAccount);

export default router;
