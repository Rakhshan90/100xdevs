/*
 * Write 3 different functions that return promises that resolve after t1, t2, and t3 seconds respectively.
 * Write a function that sequentially calls all 3 of these functions in order.
 * Return a promise chain which return the time in milliseconds it takes to complete the entire operation.
 * Compare it with the results from 3-promise-all.js
 */

function wait1(t) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, t * 1000);
    })
}

function wait2(t) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, t * 1000);
    })
}

function wait3(t) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, t * 1000);
    })
}

function calculateTime(t1, t2, t3) {
    const startTime = new Date().getTime();
    return wait1(t1).then(()=>{
        console.log("First promise has been resolved");
        return wait2(t2);
    }).then(()=>{
        console.log("Second promise has been resolved");
        return wait3(t3);
    }).then(()=>{
        console.log("Third promise has been resolved");
        const endTime = new Date().getTime();
        console.log(`Took ${endTime - startTime} milliseconds to execute the whole operation`);
        return endTime - startTime;
    })
}

calculateTime(2, 5, 7);

module.exports = calculateTime;
