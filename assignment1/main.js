
const fs = require('fs');
const got = require('got');

let requestPages = ['https://parsons.nyc/aa/m01.html',  'https://parsons.nyc/aa/m02.html',  'https://parsons.nyc/aa/m03.html',  'https://parsons.nyc/aa/m04.html',  'https://parsons.nyc/aa/m05.html',  'https://parsons.nyc/aa/m06.html',  'https://parsons.nyc/aa/m07.html',  'https://parsons.nyc/aa/m08.html',  'https://parsons.nyc/aa/m09.html', 'https://parsons.nyc/aa/m10.html'];



async function getData(url, fileName){
	try {
		const response = await got(url);
		fs.writeFileSync('./' + fileName + '.html', response.body);
		//=> '<!doctype html> ...'
	} catch (error) {
		console.log(error.response.body);
		//=> 'Internal server error ...'
	}
};

requestPages.forEach( (d, i)=> {
    getData(d, 'request'+i);
});
