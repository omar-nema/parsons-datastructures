const dotenv = require('dotenv').config();
const AWS = require('aws-sdk');
const { start } = require('repl');

AWS.config.update({
  region: 'us-east-1',
  accessKeyId: process.env.DYNAMODB_ACCESS_KEY_ID,
  secretAccessKey: process.env.DYNAMODB_SECRET_ACCESS_KEY,
});
let dynamodb = new AWS.DynamoDB();
let docClient = new AWS.DynamoDB.DocumentClient();

let month = '11';
let year = '21';
let ids = [];
for (i = 1; i < 11; i++) {
  ids.push(`entry-${month}0${i}${year}`);
}

let posts = [];
ids.forEach(async (d) => {
  let params = {
    TableName: 'processblog',
    KeyConditionExpression: 'id = :idName', // the query expression

    ExpressionAttributeValues: {
      // the query values
      ':idName': d,
    },
  };

  docClient.query(params, function (err, data) {
    if (err) console.log(err, err.stack);
    // an error occurred
    else {
      updateData(data);
      return;
    } // successful response
  });
});

function updateData(dataPt) {
  console.log('updating');
  if (dataPt.Items[0]) {
    posts.push(dataPt.Items[0]);
  }
  if (posts.length == 9) {
    initServer();
  }
}

var express = require('express');
var app = express();
const cors = require('cors');

async function initServer() {
  app.use(cors());

  app.get('/processBlog', function (req, res) {
    res.send(posts);
  });

  app.listen(3000, () => console.log('app listening on port 3000!')); // Webserver is running on port 3000
}
