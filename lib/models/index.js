'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const userModel = require('./userModel.js');

const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory:';

const sequelize = new Sequelize(DATABASE_URL);


const users = userModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  users: users,
};
