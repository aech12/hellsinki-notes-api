// const bcrypt = require('bcrypt');
// const User = require('../models/userModel');
// const zxcvbn = require('zxcvbn');

// const getUsers = async (req, res, next) => {
//   try {
//     const users = await User.find({}).map(user => user);
//     res.json(notes);
//   } catch (e) {
//     next(e);
//   }
// };
// const postUser = async (req, res, next) => {
//   const { username, password, name } = req.body;
//   // zxcvbn(password);
//   // let reg = /[^a-zA-Z0-9]/
//   const saltRounds = 10;
//   const passwordHash = await bcrypt.hash(password, saltRounds);
//   const user = new User({
//     username,
//     passwordHash,
//     name
//   });

//   try {
//     const newUser = await user.save();
//     res.json(200).json(newUser);
//   } catch (e) {
//     next(e);
//   }
// };

// module.exports = { getUsers, postUser };
