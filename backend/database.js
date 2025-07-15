// backend/database.js
const { Sequelize } = require("sequelize");
const path = require("path");

 const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "barbertrack.sqlite"),
  logging: false,
});

module.exports = sequelize;
