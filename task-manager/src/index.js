const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/tasks');
const bcrypt = require('bcryptjs');

const app = express();
const port  = process.env.PORT || 4000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

const hashPassword = async () => {
  const password = "Pass123!";
  const hashedPassword = await bcrypt.hash(password, 8);
  console.log(password);
  console.log(hashedPassword);
  const isMatch = await bcrypt.compare(password, hashedPassword);
  console.log(isMatch);
}

hashPassword();

app.listen(port, () => {
  console.log(`Server is up on ${port}`)
})