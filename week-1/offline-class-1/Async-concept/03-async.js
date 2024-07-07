const fs = require('fs');

// my own way to write a async function using callback
// ugly way to write async function
function rakhshanWayToReadFile(cb){
  fs.readFile('a.txt', 'utf-8', function (err, data){
    cb(data);
  })
}

function doneOnData(data){
  console.log(data);
}

rakhshanWayToReadFile(doneOnData);
