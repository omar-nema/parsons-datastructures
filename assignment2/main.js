var fs = require('fs');
var cheerio = require('cheerio');
var content = fs.readFileSync('data/request7.txt');
var $ = cheerio.load(content);

//helper to remove trailing and leading spaces
function cleanText(input){
    input = input.replace(/(\r\n|\n|\r)/gm, ""); //remove line breaks, copied from https://stackoverflow.com/questions/10805125/how-to-remove-all-line-breaks-from-a-string
    input = input.replace(/\s+/g,' ').trim(); //remove extra spaces, copied from https://stackoverflow.com/questions/16974664/how-to-remove-the-extra-spaces-in-a-string
    //location names are repeated and separated by dash. take just the first half before dash to clean it up.
    if (input.includes('-')){
        input = input.split(' -')[0];
    }
    if (input == ''){
        input = null;
    } 
    return input;
}

//helper function that gets the n-th sibling of a given element
function traverseSiblings(element, iterations){
    let e = element;
    for (let i=0; i<iterations; i++){
        e = e.nextSibling;
    };
    return $(e);
}

let meetingObjects = [];

//first, parse rows to get each column, then call separate function to get values from column.
async function parseRow(elem){
    let countCleanRows = 0;
    elem.each(function(i, row) {
        let cols = $('td', row);
        //ignore rows with columns that are larger or smaller than 3 (3 column table has the info we need)
        if (cols.length == 3){
            meetingObjects.push({});
            //for each row, take the first column and parse it
            parseColumnAddress(cols[0], countCleanRows);
            countCleanRows++;
        }
    });
    return meetingObjects;
}
//parses the 'address' column and adds to array
function parseColumnAddress(c, rowNum){
    let buildingName = cleanText($('h4', c).text());
    let groupNode = $('b', c);
    let groupName = cleanText(groupNode.text());
    //address lines are 2 and 4 siblings after group name, respectively
    let addLine1 = traverseSiblings(groupNode[0], 2).text();
    let addLine2 = traverseSiblings(groupNode[0], 4).text();
    let location = cleanText(addLine1 + ' ' + addLine2);
    
    //add meeting attributes as object properties
    meetingObjects[rowNum].buildingName = buildingName;
    meetingObjects[rowNum].groupName = groupName;
    meetingObjects[rowNum]['location'] = location;    
    return;
}

async function writeOutput(){
    let output =  await parseRow($('tbody tr'));

    console.log(output.length)
    fs.writeFileSync('./output/parsedAALocations.json', JSON.stringify(output));
}

writeOutput();
