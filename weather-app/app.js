const request = require('request');
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');


geoCode('Noida', (error, data) => {
  console.log(error);
  console.log(data);
});