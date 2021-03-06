var async = require('async');
let dbCreds = require('./dbCreds.js');
const data = require('../output/parsedAApretty.json');

let meetingTimes = [];

//add ids, create meetings array
data.forEach((d, i) => {
  d.groupId = i;
  if (!d.accessibility) {
    d.accessibility = 0;
  }

  d.meetings.forEach((z, j) => {
    z.groupId = i;

    if (z.meetingType) {
      let meetingTypeSplit = z.meetingType.split('=');
      let meetingTypeClean = meetingTypeSplit[meetingTypeSplit.length - 1]
        .replace('meeting', '')
        .trim();
      z.meetingTypeStd = meetingTypeClean;
    }

    meetingTimes.push(z);
  });
});

meetingTimes.forEach((d, i) => (d.id = i));

let client = dbCreds.client;
client.connect();

async function querySelectAll(tableName) {
  let query = `select * from ${tableName}`;
  let queryRes = await client.query(query, (err, res) => {
    console.log(err, res.rows);
    client.end();
    return res;
  });
  //console.log(queryRes.rowCount);
  return queryRes;
}

async function dropTable(tableName) {
  let query = `drop table ${tableName}`;
  let queryRes = await client.query(query, (err, res) => {
    console.log('table clear');
    client.end();
    return res;
  });
  //console.log(queryRes.rowCount);
  return queryRes;
}

async function deleteTableData(tableName) {
  let query = `delete from ${tableName}`;
  let queryRes = await client.query(query, (err, res) => {
    console.log('table clear');
    client.end();
    return res;
  });
  //console.log(queryRes.rowCount);
  return queryRes;
}

async function writeMeetings() {
  return await async.each(meetingTimes, async function (value, callback) {
    console.log('running');
    let query;
    if (!value.specialInterest) {
      query = `INSERT INTO meetingTimes(id, groupId, day, meetingType, specialInterest, starttime, endtime) VALUES ( ${value.id}, ${value.groupId}, '${value.day}','${value.meetingTypeStd}', null, '${value.startTime}', '${value.endTime}' )`;
    } else {
      query = `INSERT INTO meetingTimes(id, groupId, day, meetingType, specialInterest, starttime, endtime) VALUES ( ${value.id}, ${value.groupId}, '${value.day}','${value.meetingTypeStd}','${value.specialInterest}', '${value.startTime}', '${value.endTime}' )`;
    }
    await client.query(query, (err, res) => {
      console.log(err, res);
    });
    return;
    //setTimeout(callback, 1000);
  });
}

//INSERT MEETING GROUPS
async function writeGroups() {
  await async.each(data, async function (value, callback) {
    console.log('running');
    let query;
    query = `INSERT INTO aaGroups(id, buildingName, groupName, location, details, accessibility, latitude, long) VALUES ( ${value.groupId}, '${value.buildingName}', '${value.groupName}', '${value.location}',  '${value.details}', '${value.accessibility}' , '${value.latitude}', '${value.longitude}')`;

    console.log(query);

    await client.query(query, (err, res) => {
      console.log(err, res);
    });
    return;
  });

  return;
}

// writeMeetings();
//deleteTableData('meetingTimes');
// writeMeetings();
// querySelectAll('meetingTimes');

// writeGroups();
// deleteTableData('aaGroups');

console.log(data[322], data[323]);
