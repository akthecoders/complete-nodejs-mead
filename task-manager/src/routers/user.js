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

router.get('/users/me', auth, async (req, res) => {
    const users = await User.find({_id: req.user._id});
    return res.status(201).send(users);
});

router.get('/users/:id', auth, async (req, res) => {
  const _id = req.params.id;
  try{
    const user = await User.findById(_id);
    if(!user) {
      return res.status(404).send();
    }
    res.status(201).send(user);
  } catch(error) {
    res.status(500).send();
  }
});

router.patch('/users/:id',auth, async (req, res) => {
  const allowedUpdates = ['name', 'email', 'password', 'age'];
  const updates = Object.keys(req.body);

  const isValidOperatoin = updates.every((item) => allowedUpdates.includes(item));
  if(!isValidOperatoin) {
    return res.status(400).send({error: "Invalid Updates!"});
  }

  try {
    const _id = req.params.id;
    const body = req.body;
    const user = await User.findById(_id);
    updates.forEach((update) => user[update] = body[update]);
    await user.save();
    if(!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/users/:id',auth, async (req, res) => {
  console.log(req.params.id);
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if(!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
