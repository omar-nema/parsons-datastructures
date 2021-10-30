var fs = require('fs');
var cheerio = require('cheerio');
const { start } = require('repl');
var content = fs.readFileSync('data/request7.txt');
var $ = cheerio.load(content);

//helper to remove trailing and leading spaces
function cleanText(input) {
  input = input.replace(/(\r\n|\n|\r)/gm, ''); //remove line breaks, copied from https://stackoverflow.com/questions/10805125/how-to-remove-all-line-breaks-from-a-string
  input = input.replace(/\s+/g, ' ').trim(); //remove extra spaces, copied from https://stackoverflow.com/questions/16974664/how-to-remove-the-extra-spaces-in-a-string
  //location names are repeated and separated by dash. take just the first half before dash to clean it up.
  if (input.includes('-')) {
    input = input.split(' -')[0];
  }
  if (input == '') {
    input = null;
  }
  return input;
}

//helper function that gets the n-th sibling of a given element
function traverseSiblings(element, iterations) {
  let e = element;
  for (let i = 0; i < iterations; i++) {
    e = e.nextSibling;
  }
  return $(e);
}

let meetingObjects = [];

//first, parse rows to get each column, then call separate function to get values from column.
async function parseRow(elem) {
  let countCleanRows = 0;
  elem.each(function (i, row) {
    let cols = $('td', row);
    //ignore rows with columns that are larger or smaller than 3 (3 column table has the info we need)
    if (cols.length == 3) {
      meetingObjects.push({});
      //for each row, take the first column and parse it
      parseColumnAddress(cols[0], countCleanRows);
      parseColumnHours(cols[1], countCleanRows);
      countCleanRows++;
    }
  });
  return meetingObjects;
}
//parses the 'address' column and adds to array
function parseColumnAddress(c, rowNum) {
  let buildingName = cleanText($('h4', c).text());
  let groupNode = $('b', c);
  let groupName = cleanText(groupNode.text());
  //address lines are 2 and 4 siblings after group name, respectively
  let addLine1 = traverseSiblings(groupNode[0], 2).text();
  let addLine2 = traverseSiblings(groupNode[0], 4).text();
  let location = cleanText(addLine1 + ' ' + addLine2);
  let details = cleanText($('.detailsBox', c).text());
  let accessibility = $(c).text().indexOf('heelchair');
  if (accessibility > 0) {
    accessibility = 1;
  } else {
    accessibility = null;
  }
  //add meeting attributes as object properties
  meetingObjects[rowNum].buildingName = buildingName;
  meetingObjects[rowNum].groupName = groupName;
  meetingObjects[rowNum]['location'] = location;
  meetingObjects[rowNum]['details'] = details;
  meetingObjects[rowNum]['accessibility'] = accessibility;
  return;
}
async function parseColumnHours(c, rowNum) {
  //console.log(rowNum, c);

  let html = cleanText($(c).html());
  let split = html.split('<br> <br>');
  split.forEach((d) => {
    if (d !== '') {
      let dSel = $(d).text();
      let indicators = ['Meeting Type', 'Special Interest'];

      let timeCombined = dSel.split(indicators[0])[0];
      let dayOfWeek = cleanText(timeCombined.split('From')[0]);
      let timeRange = timeCombined.split('From')[1].split('to');
      let startTime = cleanText(timeRange[0]);
      let endTime = cleanText(timeRange[1]);
      let siSplit = dSel.split(indicators[1]);
      let si = null;
      if (siSplit.length > 1) {
        si = siSplit[siSplit.length - 1];
      }

      let meetingObject = {
        day: dayOfWeek,
        startTime: startTime,
        endTime: endTime,
        specialInterest: si,
      };
      if (!meetingObjects[rowNum].meetings) {
        meetingObjects[rowNum].meetings = [];
      }
      meetingObjects[rowNum].meetings.push(meetingObject);
    }
  });
  return;
}

module.exports = {
  parseWrapper: async function parseWrapper() {
    let output = await parseRow($('tbody tr'));
    return output;
  },
};

//for testing
// async function parseWrapper() {
//   let output = await parseRow($('tbody tr'));
//   return output;
// }

// parseWrapper();
