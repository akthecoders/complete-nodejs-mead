const request = require('request');
const geoCode = require('./utils/geocode');

// const url = 'https://api.darksky.net/forecast/bdd1cc18c210c33e5ec96d24172660c5/28.5355,77.3910?units=si';

// request({ url, json:true }, (error, response, body) => {
//   if(error) {
//     console.log("Unable to connect to Weather Service!");
//   }
//   else if(body.error) {
//     console.log('Unable to find location!');
//   }
//   else {
//     console.log("It is currently " + body.currently.temperature + " degrees out. There is a "+ body.currently.precipProbability +"% chance of rain");
//   }
// });


// const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiYWtzaGF5LWt1bWFyIiwiYSI6ImNrNHdieTRuYTVxdWEzbG82NTQ3bWJnbDUifQ.3u6F-R3XjBYVY9XUUUrz4w';

// request({url:geocodeURL, json:true}, (error, response, body) => {
//     if(error) {
//       console.log('Unable to connect to MapBox!');
//     }
//     else if(body.features.length == 0) {
//       console.log('Unable to find location! Try again with different term');
//     }
//     else {
//       const latitude = body.features[0].center[1];
//       const longitude = body.features[0].center[0];
//       console.log(latitude, longitude);
//     }
// });

geoCode('Noida', (error, data) => {
  console.log(error);
  console.log(data);
});