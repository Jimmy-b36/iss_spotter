const { fetchMyIp, fetchLocation, issFlyover } = require("./iss");

fetchMyIp((error, ip) => {
  if (error) console.log("Couldn't find ip", error);
  console.log("It worked!", ip);
});
fetchLocation("50.68.190.35", (error, location) => {
  if (error) console.log("Couldn't find location", error);
  console.log("Location: ", location);
});

issFlyover(
  { latitude: "50.238258361816406", longitude: "-119.27671813964844" },
  (error, flyOver) => {
    if (error) console.log("Couldn't find flyover", error);
    console.log("Fly Over: ", flyOver);
  }
);
