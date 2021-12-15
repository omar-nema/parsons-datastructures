var async = require('async');
let dbCreds = require('./dbCreds.js');

let meetingTimes = [];

let client = dbCreds.client;
client.connect();

async function querySelectAll(tableName) {
  let query = `select * from ${tableName}`;
  let res = await client.query(query);
  return res.rows;
}

var express = require('express');
var app = express();
const cors = require('cors');

async function initServer() {
  let grps = await querySelectAll('aaGroups');
  let meetings = await querySelectAll('meetingTimes');

  app.use(cors());

  app.get('/groups', function (req, res) {
    res.send(grps);
  });

  app.get('/meetings', function (req, res) {
    res.send(meetings);
  });

  app.listen(3000, () => console.log('Example app listening on port 3000!')); // Webserver is running on port 3000
}

initServer();

//groups is basically the location
