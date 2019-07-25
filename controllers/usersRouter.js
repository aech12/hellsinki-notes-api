const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const zxcvbn = require('zxcvbn');

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.json(users.map(user => user));
  } catch (e) {
    next(e);
  }
};
const postUser = async (req, res, next) => {
  try {
    const { username, password, name } = req.body;
    const regex = /^[a-zA-Z0-9]+([a-zA-Z0-9](_|-)[a-zA-Z0-9])*[a-zA-Z0-9]+$/;
    if (!regex.test(password) || !regex.test(username)) {
      return res.status(400).json({ e: 'Invalid characters were used' });
    }
    // console.log('PASSWORD STRENGHT: ', zxcvbn(password).score);
    const saltRounds = 10;
    // zxcvbn(password);
    // let reg = /[^a-zA-Z0-9]/
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const user = new User({
      username,
      passwordHash,
      name
    });
    const newUser = await user.save();
    res.json(newUser);
  } catch (e) {
    next(e);
  }
};

module.exports = { getUsers, postUser };
