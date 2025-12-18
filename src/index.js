require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { serverConfig } = require('./config');
const apiRoutes = require('./routes');
const Logger = require('./config/logger-config');

// --- NEW STEP 1: Import the Service ---
const { FlightService } = require('./services');

const db = require('./models');
const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api', apiRoutes);

// --- NEW STEP 2: Make this function 'async' ---
app.listen(serverConfig.PORT, async () => {
    console.log(`successfully started the server on PORT : ${serverConfig.PORT}`);
    Logger.info("successfully started the server",{});

    try {
        await db.sequelize.sync(); 
        console.log("✅ Database Synced & Tables Created");
    } catch (err) {
        console.error("Database Sync Failed:", err);
    }

    // --- NEW STEP 3: Initialize the Segment Tree ---
    try {
        const flightService = new FlightService();
        await flightService.initializePricingEngine(); // This builds the tree from DB
    } catch (error) {
        console.error("Failed to init pricing engine:", error);
    }
});