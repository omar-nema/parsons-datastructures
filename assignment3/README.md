# Documentation

For this assignment, a starter HTML file was parsed to retrieve specific properties. The HTML file contains a table with Alcoholics Anonymous meetings, along with a lot of other extraneous information.

Cheerio.js was used to aid in parsing the HTML. This code first parses the table rows containing relevant information, and then parses just the first column for each table (as this column contains the requested address information). Parsed information is then stored in object format in each array. I chose to use an array because there isn't a clear 'key' for each row - the row index seemed like a sufficient identifier to look up values. Additionally, each row is represented as an object because to account for the fact that many other properties will likely be added later. Looking up properties by name is easier than an arbitrary number for each property.

The results are stored in a text file under the 'output' folder.
