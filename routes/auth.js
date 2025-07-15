const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({ username: req.body.username, password: hashedPassword });
    await user.save();
    res.status(201).send('User registered');
  } catch (e) {
    res.status(400).send('Error registering user');
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(404).send('User not found');
    const isValid = await bcrypt.compare(req.body.password, user.password);
    if (!isValid) return res.status(401).send('Invalid credentials');
    const token = jwt.sign({ userId: user._id }, 'secretkey');
    res.send({ token });
  } catch (e) {
    res.status(400).send('Error logging in');
  }
});

module.exports = router;
