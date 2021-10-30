parse = require('./parseHtml.js');
geoCode = require('./geoCode.js');
let fs = require('fs');

async function asyncWrapper() {
  let dataObj = await parse.parseWrapper();
  let geoCoded = await geoCode.geoCode(dataObj);
  fs.writeFileSync('./output/parsedAA.json', JSON.stringify(geoCoded));
}

asyncWrapper();
