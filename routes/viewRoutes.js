const express = require('express');
const viewsController = require('../controllers/viewsController');
const catchAsync = require('../utils/catchAsync');

const authController = require('../controllers/authController');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

router.use(viewsController.alerts);

router.get('/', 
  // todo anas should remove next line once app is deployed
  bookingController.createBookingCheckoutWorkaround,
  authController.isLoggedIn, 
  viewsController.getOverview);

router.get('/tour/:slug', authController.isLoggedIn, viewsController.getTour);
router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
router.get('/me', catchAsync(authController.protect), viewsController.getAccount);

router.get('/my-tours', authController.protect, viewsController.getMyTours);

router.post(
  '/submit-user-data',
  authController.protect,
  viewsController.updateUserData
);

module.exports = router;
