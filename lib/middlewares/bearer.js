'use strict';
require('dotenv').config();
const { users } = require('../models/index.js');
const jwt = require('jsonwebtoken');
const HttpError = require('../error-handlers/httpError');


module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) { return next(new HttpError('Invalid credentials', 401)); }

    const token = req.headers.authorization.split(' ').pop();
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const validUser = await users.findOne({ where: { username: decodedToken.username } });
    if (!validUser) {
      return next(new HttpError('New phone, who dis', 401));
    }
    req.user = validUser;
    req.token = validUser.token;
    next();

  } catch (e) {
    return next(new HttpError('New phone, who dis', 401));
  }

};