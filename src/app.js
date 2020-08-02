const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// console.log(__dirname);
// console.log(path.join(__dirname, '../public'));

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public');
const viewsDirPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsDirPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Malarvannan S'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    message: 'Please email me in case of any queries.',
    name: 'Malarvannan S'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Malarvannan S'
  });
});

app.get('/weather', (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: 'Please provide a valid address to get weather forecast!!!'
    });
  }

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error
      });
    }

    forecast(longitude, latitude, (error, forecast) => {
      if (error) {
        return res.send({
          error
        });
      }

      res.send({
        forecast,
        location,
        address
      });
    });
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    errorMessage: 'Help article not found',
    title: '404 Error',
    name: 'Malarvannan S'
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    errorMessage: 'Page not found',
    title: '404 Error',
    name: 'Malarvannan S'
  });
});

app.listen(port, () => {
  console.log('server is up and running on port ' + port);
});