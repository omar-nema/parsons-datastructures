let dbCreds = require('./dbCreds.js');

// Sample SQL statement to create a table:
var thisQuery =
  'CREATE TABLE meetingTimes (id int GENERATED BY DEFAULT AS IDENTITY, groupId int, day varchar(100), meetingType varchar(300), specialInterest varchar(100), startTime varchar(100), endTime varchar(100) );';

// thisQuery = 'drop table meetingTimes';
let client = dbCreds.client;
client.connect();

// var thisQuery =
//   'CREATE TABLE aaGroups (id int GENERATED BY DEFAULT AS IDENTITY, buildingName varchar(100), groupName varchar(100), location varchar(100), details varchar(2555), accessibility boolean, latitude double precision, long double precision );';

client.query(thisQuery, (err, res) => {
  console.log(err, res);
  client.end();
});
