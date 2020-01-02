const express = require('express');
const path = require('path');
const pubDir = path.join(__dirname, '../public');
const app = express();

app.use(express.static(pubDir));

app.get('/weather', (req, res) => {
  res.send({
    forecast: "Forecast",
    location: "Noida",
  });
});

app.listen(3000, () => {
  console.log("Server up on port : 3000");
});