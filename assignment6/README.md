# Documentation - Assignment 6

The task here was to query the two tables created in earlier assignments. The first table is a relational DB containing Alcoholics Anonymous addresses, the second is a NoSQL database containing a log of my daily habits.

6a.js contains code for the AA locations query. As a sample query, I included a case-insensitive search for 'fifth ave', as this models roughly how a user would search for an address (with a rough, case-insensititve search). See successful query screenshot ![here](./6a successful query.jpg).

6b.js queries my noSQL db. My primary key here was an entry in the format 'entry-mmddyy'. Prior to executing a query, I first call a function to get an array of primary keys in between a specific date range. I then execute a query for each id. See successful query screenshot ![here](./6b successful query.jpg).
