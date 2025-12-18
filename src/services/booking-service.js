const { acquireLock, releaseLock } = require('../utils/common/redis-lock');
const { AppError } = require('../utils/errors/app-error');

class BookingService {
    
    async bookSeat(flightId, seatNo) {
        const lockKey = `LOCK:FLIGHT:${flightId}:SEAT:${seatNo}`;
        
        // 1. Try to acquire the lock
        const hasLock = await acquireLock(lockKey, 30); // 30-second lock
        
        if (!hasLock) {
            // If we can't get the lock, someone else is booking it right now.
            throw new AppError('Seat is currently being booked by another user. Please try again.', 409);
        }

        try {
            // 2. SIMULATE DATABASE TRANSACTION (Critical Section)
            // In a real app, you would check DB here: 
            // if(seat.isBooked) throw new Error...
            
            console.log(`🔒 Locked seat ${seatNo}. Processing payment...`);
            
            // Simulate a 5-second payment process
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            console.log(`✅ Booking confirmed for ${seatNo}`);
            return { message: "Booking Successful", seat: seatNo };

        } catch (error) {
            throw error;
        } finally {
            // 3. ALWAYS release the lock when done
            await releaseLock(lockKey);
            console.log(`🔓 Lock released for ${seatNo}`);
        }
    }
}

module.exports = BookingService;