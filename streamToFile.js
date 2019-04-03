var fs = require('fs');
var dateFormat = require('dateformat');
var date = dateFormat(new Date(), "yyyymmddhhMM");
var wstreamArray = fs.createWriteStream('./data/' + date + '.json');
wstreamArray.on('finish', function () {
    console.log('file with array has been written');
});

var wstreamAverage = fs.createWriteStream('./data/' + 'average' + '.txt', {'flags': 'a'});
//flags: a is for append (flags: w for erase and write in new file)
wstreamAverage.on('finish', function () {
    console.log('file with average has been written');
});

var exports = module.exports = {};

exports.wstreamArray = wstreamArray;
exports.wstreamAverage = wstreamAverage;