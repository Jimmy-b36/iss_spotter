const request = require("request");

const fetchMyIp = (callback) => {
  request(`https://api64.ipify.org?format=json`, (err, response, body) => {
    if (err) return callback(err, null);
    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching IP. Response: ${body}`;
      return callback(Error(msg), null);
    }
    ip = JSON.parse(body).ip;
    callback(null, ip);
    return ip;
  });
};

const fetchLocation = (ip, callback) => {
  request(
    `https://api.ipbase.com/v2/info?apikey=rZRoWBTYuRQlrPsdB5gKNvT3TSAiXaLUthy775jG&ip=${ip}`,
    (err, response, body) => {
      if (err) return callback(err, null);
      if (response.statusCode !== 200) {
        const msg = `Status code ${response.statusCode} when fetching location. Response: ${body}`;
        return callback(Error(msg), null);
      }
      const location = {};
      location.latitude = JSON.parse(body).data.location.latitude;
      location.longitude = JSON.parse(body).data.location.longitude;
      callback(null, location);
      return location;
    }
  );
};

const issFlyover = (location, callback) => {
  request(
    `https://iss-pass.herokuapp.com/json/?lat=${location.latitude}&lon=${location.longitude}`,
    (err, response, flyOver) => {
      if (err) return callback(err, null);
      if (response.statusCode !== 200) {
        const msg = `Status code ${response.statusCode} when fetching flyovers, Response ${flyOver}`;
        return callback(Error(msg), null);
      }
      flyOver = JSON.parse(flyOver).response;
      callback(null, flyOver);
      return flyOver;
    }
  );
};

const nextIssFlyTime = (callback) => {
  fetchMyIp((error, ipResult) => {
    if (error) return callback(error, null);
    fetchLocation(ipResult, (err, locationResult) => {
      if (err) return callback(err, null);
      issFlyover(locationResult, (err, flyOver) => {
        if (err) return callback(err, null);
        callback(err, flyOver);
      });
    });
  });
};

module.exports = { nextIssFlyTime };
