const { FlightService } = require('../services');
const { SuccessResponse, ErrorResponse } = require('../utils/common');

const flightService = new FlightService();

/**
 * POST /api/v1/flights/cheapest
 * Body: { "startIndex": 0, "endIndex": 10 }
 */
async function getCheapestFlight(req, res) {
    try {
        // CHANGE: Read from query parameters instead of body
        const { startIndex, endIndex } = req.query; 
        
        // Ensure they are numbers (Query params come as strings)
        const minPrice = await flightService.getCheapestFlight(
            parseInt(startIndex), 
            parseInt(endIndex)
        );
        
        SuccessResponse.data = { minPrice };
        SuccessResponse.message = "Successfully retrieved cheapest flight via Segment Tree";
        
        return res.status(200).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode || 500).json(ErrorResponse);
    }
}

module.exports = {
    getCheapestFlight
};