const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  try {
    const user = req.body;
    const userInDb = await User.findOne({ username: user.username });

    const passwordMatch = !user
      ? false
      : await bcrypt.compare(user.password, userInDb.passwordHash);
    if (!user || !passwordMatch) {
      return res.status(401).json({ e: 'Invalid username/password' });
    }

    const userForToken = { username: userInDb.username, id: userInDb.id };
    const token = await jwt.sign(userForToken, process.env.SECRET_KEY);

    res.json({ token, userForToken });
  } catch (e) {
    res.json({ e: e.message });
  }
};

module.exports = { login };
