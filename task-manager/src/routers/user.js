const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/users', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({user, token});
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/users/login', async(req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken(); 
    res.send({user, token});
  } catch (error) {
    res.status(400).send();
  }
});

router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => (token.token !== req.token));
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

router.post('/users/logoutall', auth, async(req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
})

router.get('/users/me', auth, async (req, res) => {
    const users = await User.find({_id: req.user._id});
    return res.status(201).send(users);
});

router.patch('/users/me', auth, async (req, res) => {
  const allowedUpdates = ['name', 'email', 'password', 'age'];
  const updates = Object.keys(req.body);

  const isValidOperatoin = updates.every((item) => allowedUpdates.includes(item));
  if(!isValidOperatoin) {
    return res.status(400).send({error: "Invalid Updates!"});
  }

  try {
    const body = req.body;
    updates.forEach((update) => req.user[update] = body[update]);
    await req.user.save();
    res.send(req.user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/users/me', auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
