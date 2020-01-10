const mongoose = require('mongoose');
const validator = require('validator');
mongoose.Promise = require('bluebird');

const Task = mongoose.model('Task', {
  description: {
    type: String,
    trim: true,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  }
});

module.exports = Task;