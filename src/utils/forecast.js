const request = require('request');

const forecast = (longitude, latitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=c0b496f0e40f30b091a09576ca013ba9&query=' + latitude + ',' + longitude + '&units=f';

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather services!!!', undefined);
    } else if (body.error) {
      callback('Unable to find location', undefined);
    } else {
      const current = body.current;
      const success_msg = current.weather_descriptions[0] + '. It is currently ' + current.temperature + ' degress out. It feels like ' + current.feelslike + ' degrees out. The Humidity is ' + current.humidity;
      callback(undefined, success_msg);
    }
  })
};

module.exports = forecast;