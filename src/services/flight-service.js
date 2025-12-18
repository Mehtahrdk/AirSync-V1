const { FlightRepository } = require('../repositories');
const SegmentTree = require('../utils/algorithms/segment-tree');
const { AppError } = require('../utils/errors/app-error');

const flightRepository = new FlightRepository();
let pricingTree = null; // In-memory cache for the tree

class FlightService {
    
    // Call this once when the server starts (or lazily)
    async initializePricingEngine() {
        const flights = await flightRepository.getAllPrices();
        if(!flights.length) return;

        // Extract just the prices into an array
        const prices = flights.map(f => f.price);
        pricingTree = new SegmentTree(prices);
        console.log("✅ Segment Tree Built with " + prices.length + " flights.");
    }

    async getCheapestFlight(startIndex, endIndex) {
        if (!pricingTree) {
            await this.initializePricingEngine();
        }
        
        // This query runs in O(log N) instead of O(N) database scan
        const minPrice = pricingTree.query(parseInt(startIndex), parseInt(endIndex));
        
        if (minPrice === Infinity) {
             throw new AppError('No flights found in range', 404);
        }
        return minPrice;
    }
    
    // Wrapper for standard create/get logic
    async createFlight(data) {
        return await flightRepository.create(data);
    }
}

module.exports = FlightService;