The purpose of this exercise was to 'scrape' the content from 10 different webpages for Alcoholics Anonymous meet-up groups. I accomplished this using node.js.

Here's how I did it: First, I created a function that can do a single webpage 'scrape' -- that is, it retrieves the HTML content for a webpage. This function writes its output to a text file. Then, I looped through an array (or list) of all 10 webpages, and ran this function once for each webpage. The result: 10 different text files, each with output corresponding to one of the 10 requested webpages!
