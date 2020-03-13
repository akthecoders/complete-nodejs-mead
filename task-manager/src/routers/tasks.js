const express = require('express');
const Task = require('../models/Task');
const router = new express.Router();
const auth = require('../middleware/auth');

router.post('/tasks', auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(err);
  }
});

// GET /tasks?completed=false
// GET /tasks?limit=10
// GET /tasks?sortBy=createdAt:asc
router.get('/tasks', auth, async (req, res) => {
  const match = {}
  const sort = {}
  if(req.query.completed) {
    match.completed = req.query.completed === 'true';
  }

  if(req.query.sortBy) {
    const parts = req.query.sortBy.split(':')
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;  
  }

  try {
    await req.user.populate({
      path: 'tasks',
      match,
      options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        sort
      }
    }).execPopulate();
    res.status(201).send(req.user.tasks); 
  } catch (error) {
    res.status(500).send(err); 
  }
});

router.get('/tasks/:id', auth, async (req, res) => {
  const _id = req.params.id;
  try {
      const task = await Task.findOne({_id, owner: req.user._id});
      if(!task) {
        return res.status(404).send();
      }
      res.status(201).send(task); 
  } catch (error) {
    res.status(500).send();
  }
});

router.patch('/tasks/:id', auth, async (req, res) => {
  const allowedUpdates = ['description', 'completed'];
  const updates = Object.keys(req.body);

  const isValidOperatoin = updates.every((item) => allowedUpdates.includes(item));
  if(!isValidOperatoin) {
    return res.status(400).send({error: "Invalid Updates!"});
  }

  try {
    const _id = req.params.id;
    const body = req.body;
    const task = await Task.findOne({_id, owner: req.user._id});
    if(!task) {
      return res.status(404).send();
    }
    updates.forEach((update) => {
      task[update] = body[update];
    })
    task.save();
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id});
    if(!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;