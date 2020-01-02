const https = require('https');


const url = 'https://api.darksky.net/forecast/bdd1cc18c210c33e5ec96d24172660c5/40,-75?units=si';
const request = https.request(url, (response) => {
  let data = "";

  response.on('data', (chunk) => {
    data += chunk.toString();
  });

  response.on('end', () => {
    const body = JSON.parse(data);
    console.log(body);
  });
});

request.on('error', (error) => {
  console.log('An error : ', error);
});
request.end();