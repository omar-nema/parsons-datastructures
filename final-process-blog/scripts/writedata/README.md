# Documentation: Assignment 5.2

In this assignment, I was tasked with adding data to the NoSQL Amazon DynamoDB. There was some pre-requisite work prior to the assignment in setting up a DynamoDB instance. Specifically: the data I am adding here is a log of my daily habits.

There are two relevant files here:

### data.js

This file contains JSON formatted data with one object for each entry (per day). This file is imported into dbInterface.js.

### dbInterface.js

This file takes the data in data.js, and inserts it into dynamoDB. The AWS Software Development Kit is used to insert data.

There are a couple of deviations from the started code that should be called out.

I opted to use an Access Key rather than IAM permissioning for this assignment. I wanted to use a local code editor rather than Cloud9 to ensure that the knowledge I'm gaining here will be transferable to future projects.
I know this was not the recommended workflow, but I believe it is justifiable because (1) I created a restricted permissions group for this access key to only write to DynamoDB, and nothing else (2) My AWS account is linked to an expired credit card and (3) My keys are in a .env file, and not stored on Github.

Additionally, I used 'put' rather than 'putItem', along with the DynamoDB DocumentClient interface. This functionality allowed me to use standard JS objects as my data, without having to specify the data type for each object.
