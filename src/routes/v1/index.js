const express=require('express');

const { InfoController }=require('../../controllers');
const { FlightController } = require('../../controllers');
const { BookingController } = require('../../controllers');
const AuthController = require('../../controllers/auth-controller');

const airplaneRoutes= require('./airplane-routes');
const cityRoutes = require('./city-routes');
const airportRoutes = require('./airport-routes');


const router=express.Router();

router.use('/airplanes',airplaneRoutes);
router.use('/cities',cityRoutes);
router.use('/airports',airportRoutes);

router.get('/info',InfoController.info);
router.get('/flights/cheapest', FlightController.getCheapestFlight);
router.post('/bookings', BookingController.createBooking);
router.post('/signup', AuthController.signup);
router.post('/login', AuthController.login);

module.exports = router;