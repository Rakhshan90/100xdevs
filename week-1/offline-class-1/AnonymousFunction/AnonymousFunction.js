function square(n){
    return n * n;
  }
  
  function cube(n){
    return n * n * n;
  }
  
  function sumOfSomething(a, b, callback){
    console.log(a);
    console.log(callback);
    let res3 = callback(a);
    let res4 = callback(b);
    console.log(res3 + res4);
  }
  
  // sumOfSomething(1, 2, cube); 
  sumOfSomething(1, 2, function (n){
                  return n * n * n;
                })
  