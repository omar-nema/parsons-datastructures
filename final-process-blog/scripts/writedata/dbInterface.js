const dotenv = require('dotenv').config();
const AWS = require('aws-sdk');
require('./data');

class DailyHabits {
  constructor() {
    this.id = null;
    this.dateAdded = null;
    this.dateUpdated = null;
    this.journalInd = null;
    this.steps = null;
    this.workoutInd = null;
    this.workoutType = null;
    this.mood = null;
    this.notes = null;
    this.test = null;
  }
}

AWS.config.update({
  region: 'us-east-1',
  accessKeyId: process.env.DYNAMODB_ACCESS_KEY_ID,
  secretAccessKey: process.env.DYNAMODB_SECRET_ACCESS_KEY,
});
var dynamodb = new AWS.DynamoDB();
let docClient = new AWS.DynamoDB.DocumentClient();

blogData.forEach((d) => {
  let params = {
    TableName: 'processblog',
    Item: d,
  };

  docClient.put(params, function (err, data) {
    if (err) console.log(err, err.stack);
    // an error occurred
    else console.log(data); // successful response
  });
});
