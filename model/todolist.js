const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const addData = sequelize.define('adddata', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    updatedAt : {
        type : Sequelize.DATE,
        allowNull : false
    }
});

module.exports = addData;