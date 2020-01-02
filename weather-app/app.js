const request = require('request');
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const location = process.argv[2];
if(!location) {
  console.log('Please provide location');
  return;
}
geoCode(location, (error, {latitude, longitude, location}) => {
  if(error) {
    return console.log(error);
  }
  else {
    forecast(latitude, longitude, (error, forecastData) => {
      if(error) {
        return console.log(error);
      }
      console.log(location);
      console.log(forecastData);
    });
  }
});