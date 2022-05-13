const request = require("request-promise-native");

const fetchMyIp = () => {
  return request(`https://api64.ipify.org?format=json`);
};

const fetchLocation = (body) => {
  const ip = JSON.parse(body).ip;
  return request(
    `https://api.ipase.com/v2/info?apikey=rZRoWBTYuRQlrPsdB5gKNvT3TSAiXaLUthy775jG&ip=${ip}`
  );
};

const issFlyover = (locationBody) => {
  const { latitude, longitude } = JSON.parse(locationBody).data.location;
  return request(
    `https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`
  );
};

const nextIssFlyTime = () => {
  return fetchMyIp()
    .then(fetchLocation)
    .then(issFlyover)
    .then((issResponse) => {
      const flyTimes = JSON.parse(issResponse).response;
      return flyTimes;
    });
};

module.exports = { nextIssFlyTime };
