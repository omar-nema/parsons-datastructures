parse = require('./parseHtml.js');
geoCode = require('./geoCode.js');
let fs = require('fs');

async function asyncWrapper() {
  console.log('html parse');
  let dataObj = await parse.parseWrapper();
  console.log('html done', dataObj.length);
  console.log('geocode start');
  let geoCoded = await geoCode.geoCode(dataObj);
  console.log('geocode done');
  fs.writeFileSync('../output/parsedAA.json', JSON.stringify(dataObj));
}

asyncWrapper();
