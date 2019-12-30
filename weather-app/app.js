const request = require('request');

const url = 'https://api.darksky.net/forecast/bdd1cc18c210c33e5ec96d24172660c5/28.5355,77.3910?units=si';

request({ url, json:true }, (error, response, body) => {
  const data = body;
  // console.log(data.currently);
  console.log("It is currently " + data.currently.temperature + " degrees out. There is a "+ data.currently.precipProbability +"% chance of rain");
});

