const { Client } = require('pg');
var async = require('async');
const dotenv = require('dotenv');
dotenv.config();

// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'omar';
db_credentials.host = 'dsdb.cexzjdprjz7t.us-east-1.rds.amazonaws.com';
db_credentials.database = 'aa';
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port = 5432;

module.exports = {
  client: new Client(db_credentials),
};
