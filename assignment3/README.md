# Documentation - Assignment 3

For this assignment, we were tasked with geocoding a set of addresses using the Texas A&M Geoservices API.

- First, a JSON file containing the addresses is parsed into an array (Line 15)
- We then asynchronously loop through each of these addresses (Line 27)
- For each address, we run apiCallWrapper (Line 15), which extracts the ZIP and street address, and retrieves the latitude and longitude by executing the getLatLong() function
- The address object is updated to include a latitude and longitude when apiCallWrapper() is done executing (Line 23)
- After all addresses have their lat/long encoded, we then write the updated address object to a file (Line 28)
