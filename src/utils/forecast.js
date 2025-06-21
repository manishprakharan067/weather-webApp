const request = require("postman-request");

const forecast = (lat, long, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=d5be031cc8c09c46f625469246d50452&query=" +
    lat +
    "," +
    long +
    "&units=f";

  request({ url: url, json: true }, (error, response, body) => {
    if (error) {
      callback("Unable to connect to the internet", undefined);
    } else if (response.body.error) {
      callback("Unable to find the location", undefined);
    } else {
      const { weather_descriptions, temperature, feelslike } = body.current;
      const message = `${weather_descriptions[0]} It is currently ${temperature} fahrenheit out. It is feels like ${feelslike} out there in region ${body.location.region}`;
      callback(undefined, {
        forecast: message,
        location: body.location.name,
        region: body.location.region,
        country: body.location.country,
        latitude: body.location.lat,
        longitude: body.location.lon,
        observation_time: body.current.observation_time,
        weather_descriptions: body.current.weather_descriptions,
        temperature: body.current.temperature,
        feelslike: body.current.feelslike,
        humidity: body.current.humidity,
        pressure: body.current.pressure,
        wind_speed: body.current.wind_speed,
        wind_degree: body.current.wind_degree,
      });
    }
  });
};

module.exports = forecast;
