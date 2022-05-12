const { fetchMyIp, fetchLocation } = require("./iss");

fetchMyIp((error, ip) => {
  if (error) console.log("Couldn't find ip", error);
  console.log("It worked!", ip);
});
fetchLocation("50.68.190.35", (error, location) => {
  if (error) console.log("Couldn't find location", error);
  console.log(error, location);
});
