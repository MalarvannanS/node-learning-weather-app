const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWFsYXJ2YW5uYW4iLCJhIjoiY2tiMmh2OGQ2MDlpODJ4czB0OHJraTRkeSJ9.W_T0qRUFaISEYwVPp8xlDg&limit=1';

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('We are not able to connect to map box api!!!', undefined);
        } else if (body.features.length === 0) {
            callback('Something wrong with the request url, please try with different search terms.', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }

    });
};

module.exports = geocode
