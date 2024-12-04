function sumOfN(n){
    let sum = 0;
    for(let i=1; i<=n; i++){
      sum += i;
    }
    return sum;
  }
  
  function findSum(){
    console.log(sumOfN(100));
  }
  
  setTimeout(findSum, 1000);  // Async function
  
  
  // this sync operation takes more time than the setTimeout async operation
  function syncSleep(){
    let a = 1;
    for(let i=0; i<100000000000; i++){
      a++;
    }
  }
  
  // syncSleep();
  
  console.log("hello world");