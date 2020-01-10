require('../src/db/mongoose');
const Task = require('../src/models/Task');

const _id = '5e157b3762e33a16bf39f2e0';

Task.findByIdAndDelete(_id).then(() => {
  return Task.countDocuments({completed: false})
}).then((result) => {
  console.log(result);
})