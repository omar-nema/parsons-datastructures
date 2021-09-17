"use strict"

// dependencies
const fs = require('fs'),
      querystring = require('querystring'),
      got = require('got'),
      async = require('async'),
      dotenv = require('dotenv');

//open existing JSON file with addressess
fs.readFile('./output/parsedAALocations.json', 'utf8', async (err, data) => {
    let dataObj = JSON.parse(data);
    
    //parse address file to get zip and street, then run API call to get latitude and long
    async function apiCallWrapper(d){
       //get zip and street from each address that we parsed in last assignment
        let locationSplit = d.location.split(',');
        let street = locationSplit[0];
        let zip = locationSplit[locationSplit.length-1].match(/\d{5}(-\d{4})?\b/g)[0];
        //run API request to get lat long
        let latLong = await getLatLong(street, zip);
        //write to existing object!
        d['latLong'] = latLong;
        return;
    }
    //run all api calls, then after that's done write the output to a file
    async.each(dataObj, apiCallWrapper, function(err){
       fs.writeFileSync('./output/latlong.json', JSON.stringify(dataObj));
       console.log('DONE !!')
    });
    
    
});

// TAMU api key
dotenv.config();
const API_KEY = process.env.TAMU_KEY;
async function getLatLong(street, zipinput){
    const API_URL = 'https://geoservices.tamu.edu/Services/Geocode/WebService/GeocoderWebServiceHttpNonParsed_V04_01.aspx'
    let query = {
        streetAddress: street,
        zip: zipinput,
        apikey: API_KEY,
        format: "json",
        version: "4.01"
    };
    let apiRequest = API_URL + '?' + querystring.stringify(query);
    
	try {
		const response = await got(apiRequest);
		let tamuGeo = JSON.parse(response.body);
		let latLong = {
		    latitude: tamuGeo.OutputGeocodes[0].OutputGeocode.Latitude,
		    longitude: tamuGeo.OutputGeocodes[0].OutputGeocode.Longitude
		}
        return latLong;
	} catch (error) {
		console.log(error.response.body);
	}
    setTimeout(2000);
};


