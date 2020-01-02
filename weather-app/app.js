const request = require('request');

const url = 'https://api.darksky.net/forecast/bdd1cc18c210c33e5ec96d24172660c5/28.5355,77.3910?units=si';
const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiYWtzaGF5LWt1bWFyIiwiYSI6ImNrNHdieTRuYTVxdWEzbG82NTQ3bWJnbDUifQ.3u6F-R3XjBYVY9XUUUrz4w';

request({url:geocodeURL, json:true}, (error, response, body) => {
    const latitude = body.features[0].center[1];
    const longitude = body.features[0].center[0];
} )

request({ url, json:true }, (error, response, body) => {
  const data = body;
  console.log("It is currently " + data.currently.temperature + " degrees out. There is a "+ data.currently.precipProbability +"% chance of rain");
});

