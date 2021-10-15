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

Date.prototype.addDays = function (days) {
  let date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

function getDates(startDate, stopDate) {
  startDate = new Date(startDate);
  stopDate = new Date(stopDate);

  let dateArray = [];
  let currentDate = startDate;
  while (currentDate <= stopDate) {
    // dateArray.push();
    let newDate = new Date(currentDate);
    dateArray.push(
      `entry-${newDate.getMonth() + 1}${newDate.getDate()}${newDate
        .getFullYear()
        .toString()
        .slice(-2)}`
    );
    currentDate = currentDate.addDays(1);
  }
  return dateArray;
}

let ids = getDates('10-12-21', '10-14-21');

ids.forEach((d) => {
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
    else console.log(data); // successful response
  });
});
