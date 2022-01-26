'use strict';

require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET || 'secretstring';

const userModel = (sequelize, DataTypes) => {
  console.log('INSIDE THE USERMODEL');
  const model = sequelize.define('Users', {
    username: { type: DataTypes.STRING, required: true, unique: true },
    password: { type: DataTypes.STRING, required: true },
    role: { type: DataTypes.ENUM('user', 'writer', 'editor', 'admin'), required: true, defaultValue: 'user'},
    token: {
      type: DataTypes.VIRTUAL,
      get() {
        console.log('before JWT username is: ', this.username);
        return jwt.sign({ username: this.username }, SECRET);
      },
      set(tokenObj) {
        console.log('inside set(tokenObj)');
        let token = jwt.sign(tokenObj, SECRET);
        return token;
      },
    },
    capabilities: {
      type: DataTypes.VIRTUAL,
      get() {
        const acl = {
          user: ['read'],
          writer: ['read', 'create'],
          editor: ['read', 'create', 'update'],
          admin: ['read', 'create', 'update', 'delete'],
        };
        return acl[this.role];
      },
    },
  });

  model.beforeCreate(async (user) => {
    console.log('beforeCreate user is: ', user);
    let hashedPass = await bcrypt.hash(user.password, 10);
    user.password = hashedPass;
  });
  return model;
};
module.exports = userModel;