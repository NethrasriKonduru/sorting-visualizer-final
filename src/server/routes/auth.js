const express = require('express');
const router = express.Router();
const User = require('../models/Users');

router.post('/login', async (req, res) => {
  const { name, email } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name, email });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Login failed', details: err });
  }
});

module.exports = router;

const path = require('path');
console.log('Resolved path:', path.resolve(__dirname, '../models/User.js'));

