const { nextIssFlyTime } = require('./issPromises');

nextIssFlyTime()
  .then((flyTimes) => {
    printPassTimes(flyTimes);
  })
  .catch((err) => {
    console.log("That didn't work, Here's the error message", err);
  });

function printPassTimes(flyTimes) {
  for (time in flyTimes) {
    console.log(
      `Next pass at ${Date(flyTimes[time].risetime)} for ${
        flyTimes[time].duration
      } seconds`
    );
  }
}
