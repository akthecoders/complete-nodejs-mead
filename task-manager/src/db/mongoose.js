const mongoose = require('mongoose');
const validator = require('validator');

const connectionURL = 'mongodb://127.0.0.1:27017/task-manager-api';

mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const User = mongoose.model('User', {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if(!validator.isEmail(value)) {
        throw new Error('Email is invalid');
      }
    }
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if(value < 0) {
        throw new Error('Age must be a positive number');
      }
    }
  }
});

const me = new User({
  name: "Akshay Kumar      ",
  email: "akthecoder@gmail.com   "
});

me.save().then(() => {
  console.log('me', me);
}).catch((error) => {
  console.log('error', error);
});

// const Tasks = mongoose.model('Tasks', {
//   description: {
//     type: String
//   },
//   completed: {
//     type: Boolean
//   }
// });

// const task = new Tasks({
//   description: "Description of the task",
//   completed: true
// });
// task.save().then(() => {
//     console.log('task', task);
//   }).catch((error) => {
//     console.log('error', error);
//   });