// callback syntax 
// function rakhshanAsyncFunction(callback){
//     setTimeout(function (){
//       callback("Hi there")
//     }, 3000);
//  }
 
//  async function main(){
//    rakhshanAsyncFunction(function (value){
//      console.log(value);
//    })
//  }
 
//  main();
//  console.log("Hello world");
 
 

// Handling promise in callback/promise way
// function rakhshanAsyncFunction(){
//     const p = new Promise(function (resolve){
//       setTimeout(function (){
//         resolve("Hi there");
//       }, 3000);
//     })
//     return p;
//   }
  
//   async function main(){
//     rakhshanAsyncFunction().then(function (value){
//       console.log(value);
//     })
//     console.log("Hi there 2");
//   }
  
//   main();
//   console.log("Hello world");
  
  
  
  
// Handling promise in async/await way. much more cleaner and readable
function rakhshanAsyncFunction(){
    const p = new Promise(function (resolve){
      setTimeout(function (){
        resolve("Hi there");
      }, 3000);
    })
    return p;
  }
  
  async function main(){
    const value = await rakhshanAsyncFunction();
    console.log(value);
    console.log("Hi there 2");
  }
  
  main();
  console.log("Hello world");
  
  
  
  
  
  

