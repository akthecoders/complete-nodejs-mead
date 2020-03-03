const express = require('express');
const User = require('../models/User');
const router = new express.Router();

router.post('/users', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.status(201).send(users);
  } catch (error) {
    res.status(500).send(err);  
  }
});

router.get('/users/:id', async (req, res) => {
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

router.patch('/users/:id', async (req, res) => {
  const allowedUpdates = ['name', 'email', 'password', 'age'];
  const updates = Object.keys(req.body);

  const isValidOperatoin = updates.every((item) => allowedUpdates.includes(item));
  if(!isValidOperatoin) {
    return res.status(400).send({error: "Invalid Updates!"});
  }

  try {
    const _id = req.params.id;
    const body = req.body;
    const user = await User.findByIdAndUpdate(_id, body, { new: true, runValidators: true });
    if(!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/users/:id', async (req, res) => {
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