const fs = require('fs');

// my own way to write a async function using promises
// more readable way to write async function
function rakhshanWayToReadFile(){
  return new Promise(function(resolve){
    fs.readFile('a.txt', 'utf-8', function(err, data){
      resolve(data);
    })
  })
}

function doneOnData(data){
  console.log(data);
}

rakhshanWayToReadFile().then(doneOnData);
