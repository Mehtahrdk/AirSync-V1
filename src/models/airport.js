'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Airport extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.City, {
        foreignKey: 'cityId', // Explicitly use the 'cityId' column
        onDelete: 'CASCADE'
      });
      this.hasMany(models.Flight, {
        foreignKey: 'departureAirportId',
        onDelete: 'CASCADE'
      });
      this.hasMany(models.Flight, {
        foreignKey: 'arrivalAirportId',
        onDelete: 'CASCADE'
      });
    }
  }
  Airport.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    address: DataTypes.STRING,
    cityId: { // We define it explicitly here
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Airport',
  });
  return Airport;
};