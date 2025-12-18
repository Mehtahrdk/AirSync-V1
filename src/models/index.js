'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const db = {};

// --- HARDCODED CONNECTION (Fastest Fix) ---
// PASTE YOUR TIDB STRING INSIDE THESE QUOTES:
const connectionString = "mysql://34v8xStf22hVrvJ.root:eo3k0RH3tNucIo0n@http://gateway01.ap-southeast-1.prod.aws.tidbcloud.com:4000/test"; 

let sequelize;

try {
    sequelize = new Sequelize(connectionString, {
        dialect: 'mysql',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
        logging: false
    });
    console.log("✅ Connection initialized with Hardcoded String");
} catch (error) {
    console.error("❌ Critical Database Config Error:", error);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;