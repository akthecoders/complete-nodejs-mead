const express = require('express');
require('./db/mongoose');
const User = require('./models/User');
const Task = require('./models/Task');

const app = express();
const port  = process.env.PORT || 3000;

app.use(express.json())
app.post('/users', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.status(201).send(users);
  } catch (error) {
    res.status(500).send(err);  
  }
});

app.get('/users/:id', async (req, res) => {
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

app.patch('/users/:id', async (req, res) => {
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

app.delete('/users/:id', async (req, res) => {
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

app.post('/tasks', async (req, res) => {
  const task = new Task(req.body);
  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(err);
  }
});

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(201).send(tasks); 
  } catch (error) {
    res.status(500).send(err); 
  }
});

app.get('/tasks/:id', async (req, res) => {
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

app.patch('/tasks/:id', async (req, res) => {
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

app.delete('/tasks/:id', async (req, res) => {
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

app.listen(port, () => {
  console.log(`Server is up on ${port}`)
})