const { Client } = require('pg');
const cTable = require('console.table');
const dotenv = require('dotenv');
dotenv.config();
var async = require('async');

console.log(process.env.AWSRDS_PW);
// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'omar';
db_credentials.host = 'dsdb.cexzjdprjz7t.us-east-1.rds.amazonaws.com';
db_credentials.database = 'aa';
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port = 5432;

// Connect to the AWS RDS Postgres database
const client = new Client(db_credentials);
client.connect();

var thisQuery = "SELECT * from aaLocations where address ILIKE '%fifth ave%' ";

client.query(thisQuery, (err, res) => {
  if (err) {
    throw err;
  } else {
    console.table(res.rows);
    client.end();
  }
});
