const mysql = require("mysql2");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    "node-complete", 
    "root", 
    "Trumpet!1", 
    {
        dialect: "mysql",
        host: "localhost"
});

module.exports = sequelize;