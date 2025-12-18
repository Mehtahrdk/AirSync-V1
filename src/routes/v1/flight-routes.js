const express = require('express');
const { FlightController } = require('../../controllers');
const router = express.Router();

// Existing routes...
// router.post('/', FlightController.createFlight);

// NEW Advanced DS Route
router.get('/cheapest', FlightController.getCheapestFlight);

module.exports = router;