require('../src/db/mongoose');
const User = require('../src/models/User');

const _id = '5e1827fbda7a423decba7a89';

User.findByIdAndUpdate(_id, {age: 1}).then((user) => {
  console.log(user);
  return user.countDocuments({age: 1});
}).then((result) => {
  console.log(result);
}).catch((e) => {
  console.log(e);
})
