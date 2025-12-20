const db = require('./models');

const setup = async () => {
    try {
        console.log("⏳ Starting HEAVY Live Database Seed...");

        // 1. Create/Find Cities (Use findOrCreate to avoid duplicates if you ran it before)
        const [city1] = await db.City.findOrCreate({ where: { name: 'Delhi' } });
        const [city2] = await db.City.findOrCreate({ where: { name: 'Mumbai' } });
        console.log("✅ Cities Ready");

        // 2. Create/Find Airports
        const [airport1] = await db.Airport.findOrCreate({
            where: { code: 'DEL' },
            defaults: { name: 'Indira Gandhi International Airport', cityId: city1.id }
        });
        const [airport2] = await db.Airport.findOrCreate({
            where: { code: 'MUM' },
            defaults: { name: 'Chhatrapati Shivaji Maharaj International Airport', cityId: city2.id }
        });
        console.log("✅ Airports Ready");

        // 3. Create/Find Airplane
        const [airplane] = await db.Airplane.findOrCreate({
            where: { modelNumber: 'Boeing 777' },
            defaults: { capacity: 300 }
        });
        console.log("✅ Airplane Ready");

        // 4. GENERATE 100 FLIGHTS
        console.log("🚀 Generating 100 Flights... (This might take 10 seconds)");
        
        const today = new Date();
        const flights = [];

        for(let i=0; i<100; i++) {
            // Randomize Date: Spread flights over next 30 days
            const randomDayOffset = Math.floor(Math.random() * 30); 
            const flightDate = new Date(today);
            flightDate.setDate(today.getDate() + randomDayOffset);
            
            // Randomize Time: Spread throughout the day
            flightDate.setHours(Math.floor(Math.random() * 23), Math.floor(Math.random() * 59));

            // Randomize Price: Between ₹2000 and ₹9000
            // This is CRITICAL for testing Segment Tree min-query
            const randomPrice = 2000 + Math.floor(Math.random() * 7000);

            flights.push({
                flightNumber: `IND-${1000 + i}`,
                airplaneId: airplane.id,
                departureAirportId: airport1.id, // DEL
                arrivalAirportId: airport2.id,   // MUM
                arrivalTime: new Date(flightDate.getTime() + 2 * 60 * 60 * 1000), // +2 hours
                departureTime: flightDate,
                price: randomPrice,
                totalSeats: 300,
                boardingGate: `${Math.floor(Math.random() * 10) + 1}A`
            });
        }

        // Bulk Create is much faster than a loop
        await db.Flight.bulkCreate(flights);

        console.log(`✅ ${flights.length} Flights Created Successfully!`);
        console.log("📊 Price Range: ₹2000 - ₹9000");
        console.log("⚠️ IMPORTANT: RESTART RENDER SERVER TO LOAD THESE INTO RAM!");
        
    } catch (error) {
        console.error("❌ Seeding Failed:", error);
    }
}

setup();