const request = require("postman-request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/search/geocode/v6/forward?q=${encodeURIComponent(
    address
  )}&access_token=pk.eyJ1IjoibWFuaXNocHJha2hhcmFuIiwiYSI6ImNtOXk3eHFuczE4emcyaXNlYmN3ZjN5NmEifQ.znmXbFAn-pj8JADkv_-ciw&limit=1`;

  request({ url: url, json: true }, function (error, response, body) {
    if (error) {
      callback("Unable to connect to location services", undefined);
    } else if (response.body.features.length === 0) {
      callback("Unable to find location. Try another search", undefined);
    } else {
      const features = body.features[0];
      const { latitude, longitude } = features.properties.coordinates;
      const { place_formatted } = features.properties;
      callback(undefined, {
        latitude: latitude,
        longitude: longitude,
        location: place_formatted,
      });
    }
  });
};

module.exports = geocode;
