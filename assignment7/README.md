# Documentation - Assignment 7

For this assignment, we were tasked with parsing HTML from 10 webpages, cleaning the data, and then writing this data to an AWS Postgres DB. I broke out my solution into several files.

### parseHTML.js

This file uses cheerio.js, a node library used for scraping webpages. Using cheerio, and Javascript string manipulation functions, I parsed data from the Alcoholics Anonymous webpages, and returned the output of all 10 HTML pages in a single array. This file is called by 'writeToFile.js'

### geoCode.js

Taking as an input an array of objects containing address attributes, the geocode.js file will send each address to a geocoding API, and return encoded latitude and longitude. This latitude and longitude value is added to the original Javascript object. This primary function from this file is called by 'writeToFile.js'.

### writeToFile.js

This script calls on two other scirpts. First, parseHTML is called, and the output is stored to a JS object. This output is then fed into geoCode.js. The output from both of these operations is then fed to a .JSON file.

### createDb.js

This file was used to created two tables within a database. These tables are used to store AA data. One table stores each AA group and its metadata (1 row per group), and the second stores each meeting with a foreign key linkage to the group (1 or multiple rows per group).

### writeToDb.js

This script contains a number of functions for deleting, adding, and querying data from AWS tables. I ran individual functions in this script in sequence by commenting/uncommenting. For example: first I would delete data from table. Then I would comment this script out, and then add data. And lastly I would query to see the result.
This script could definitely be improved so that deletion, insertion, and querying happens all in sequence using async functions. Given that this was a one-time load however, I decided not to invest in improving the script further.
