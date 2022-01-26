'use strict';

require('dotenv').config();
const server = require('./lib/server.js');
const { db } = require('./lib/models');

db.sync().then(() => {
  server.start(process.env.PORT || 3001);
});