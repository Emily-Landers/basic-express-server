'use strict';

const base64 = require('base-64');
const { users } = require('../models/index.js');
const HttpError = require('../error-handlers/httpError');
const bcrypt = require('bcrypt');

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) { return next(new HttpError('New phone, who dis?', 401)); }
  let basic = req.headers.authorization.split(' ').pop();
  let [username, password] = base64.decode(basic).split(':');
  try {
    const foundUser = await users.findOne({ where: { username } });
    if (!foundUser) {
      return next(new HttpError('New phone, who dis?', 401));
    }
    const valid = await bcrypt.compare(password, foundUser.password);
    if (!valid) {
      return next(new HttpError('New phone, who dis?', 401));
    }
    req.user = foundUser;
    next();
  } catch (err) {
    return next(new HttpError('New phone, who dis?', 401));
  }

};