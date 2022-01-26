'use strict';

const express = require('express');
const authRouter = express.Router();
const HttpError = require('../error-handlers/httpError');

const { users } = require('../models/index.js');
const basicAuth = require('../middlewares/basic.js');

authRouter.post('/signup', async (req, res, next) => {
  try {
    let userRecord = await users.create(req.body);
    const user = {
      user: userRecord,
      token: userRecord.token,
    };
    console.log('in POST /SIGNUP route', user);
    res.status(201).send(user);
  } catch (e) {
    return next(e.message);
    // return next(new HttpError('Nice try nerd', 406));
  }
});

authRouter.post('/signin', basicAuth, async (req, res, next) => {
  try {
    const user = {
      user: req.user,
      token: req.user.token,
    };
    res.status(200).send(user);
  } catch (e) {
    return next(new HttpError('My bad homie', 500));
  }
});

module.exports = authRouter;