const data = require('../output/parsedAA.json');

let meetingTimes = [];

//add ids, create meetings array
data.forEach((d, i) => {
  d.groupId = i;
  d.meetings.forEach((z) => {
    z.groupId = i;
    meetingTimes.push(z);
  });
});

console.log(meetingTimes);
