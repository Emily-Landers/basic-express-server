'use strict';
const HttpError = require('../error-handlers/httpError');


module.exports = (capability) => {
  return (req, res, next) => {
    try {
      if (req.user.capabilities.includes(capability)) {
        next();
      } else {
        return next(new HttpError('New phone, who dis', 401));
      }
    } catch (e) {
      return next(new HttpError('New phone, who dis', 401));
    }
  };
};