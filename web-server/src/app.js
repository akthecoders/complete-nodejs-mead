const express = require('express');
const path = require('path');
const hbs = require('hbs');

const app = express();

// Define paths for express config.
const pubDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and view location.
app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

// It provides access to the static assets.
app.use(express.static(pubDir));


app.get('', (req, res) => {
  res.render('index', {
    title: "Weather App",
    name: "Akshay Kumar",
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: "Akshay Kumar",
  })
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    helperText: "Some helpul help text.",
    name: "Akshay Kumar",
  });
})

app.get('/weather', (req, res) => {
  res.send({
    forecast: "Forecast",
    location: "Noida",
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Help article not found',
    name: 'Akshay Kumar',
  });
});

app.get('*', (req, res) =>{
  res.render('404', {
    title: '404',
    errorMessage: 'Page Not Found',
    name: 'Akshay Kumar',
  });
})

app.listen(3000, () => {
  console.log("Server up on port : 3000");
});