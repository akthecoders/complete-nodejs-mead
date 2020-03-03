const express = require('express');
const Task = require('../models/Task');
const router = new express.Router();

router.post('/tasks', async (req, res) => {
  const task = new Task(req.body);
  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(err);
  }
});

router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(201).send(tasks); 
  } catch (error) {
    res.status(500).send(err); 
  }
});

router.get('/tasks/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findById({_id});
      if(!task) {
        return res.status(404).send();
      }
      res.status(201).send(task); 
  } catch (error) {
    res.status(500).send();
  }
});

router.patch('/tasks/:id', async (req, res) => {
  const allowedUpdates = ['description', 'completed'];
  const updates = Object.keys(req.body);

  const isValidOperatoin = updates.every((item) => allowedUpdates.includes(item));
  if(!isValidOperatoin) {
    return res.status(400).send({error: "Invalid Updates!"});
  }

  try {
    const _id = req.params.id;
    const body = req.body;
    const task = await Task.findByIdAndUpdate(_id, body, { new: true, runValidators: true });
    if(!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete('/tasks/:id', async (req, res) => {
  console.log(req.params.id);
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if(!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;