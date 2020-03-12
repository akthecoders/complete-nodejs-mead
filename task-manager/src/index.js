const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/tasks');
const bcrypt = require('bcryptjs');

const app = express();
const port  = process.env.PORT || 4000;
const mode = 'MAINTAIN';


app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log(`Server is up on http://localhost:${port}`)
})
