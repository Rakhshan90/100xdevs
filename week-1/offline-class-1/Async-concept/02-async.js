const fs = require('fs');

// async function
fs.readFile('a.txt', 'utf-8', function (err, data){
  console.log(data);
})

// sync operation
console.log("Hello World");

// sync function that takes more time than read file async operation
let a = 1;
for(let i=0; i<100000000; i++){
  a++;
}

console.log("Hello World 2");