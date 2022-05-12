const { fetchMyIp, fetchLocation, issFlyover } = require("./iss");
const { nextIssFlyTime } = require("./iss");

nextIssFlyTime((error, passTimes) => {
  if (error) return console.log("It didn't work", error);
  for (time in passTimes) {
    console.log(
      `Next pass at ${Date(passTimes[time].risetime)} for ${
        passTimes[time].duration
      } seconds`
    );
  }
});
