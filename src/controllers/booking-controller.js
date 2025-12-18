const BookingService = require('../services/booking-service');
const { SuccessResponse, ErrorResponse } = require('../utils/common');

const bookingService = new BookingService();

async function createBooking(req, res) {
    try {
        const { flightId, seatNo } = req.body;
        const response = await bookingService.bookSeat(flightId, seatNo);
        
        SuccessResponse.data = response;
        return res.status(200).json(SuccessResponse);
        
    } catch (error) {
        ErrorResponse.error = error;
        // 409 Conflict is the correct status for "Double Booking"
        return res.status(error.statusCode || 500).json(ErrorResponse);
    }
}

module.exports = { createBooking };