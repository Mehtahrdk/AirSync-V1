const CrudRepository = require('./crud-repository');
const { Flight } = require('../models');

class FlightRepository extends CrudRepository {
    constructor() {
        super(Flight);
    }

    // Custom method to get all flight prices for the tree
    async getAllPrices() {
        // Fetch flights sorted by date (important for the tree mapping)
        const response = await Flight.findAll({
            attributes: ['price', 'departureTime'],
            order: [['departureTime', 'ASC']],
            limit: 365 // Restrict to next year for the demo
        });
        return response;
    }
}

module.exports = FlightRepository;