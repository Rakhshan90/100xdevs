"use strict";
/*
let a: number = 10;
a = "rakhshan";
console.log(a);

function greet(firstName: string){
    console.log("Hi," + firstName);
}

greet("Rakhshan");

function sum(a: number, b: number): number {
    return a + b;
}

const value = sum(4, 6);
console.log(value);

type inference
function isLegal(age: number) {
    if (age > 18) return true;
    else return false;
}

const res = isLegal(18);
console.log(res);

function ts(fn: ()=> void){
    setTimeout(fn, 5000);
}

function print(){
    console.log("Hello world!");
}

ts(print);


interface Person {
   name: string;
   age: number;
   greet(phrase: string): void;
}

class Employee implements Person {
   name: string;
   age: number;

   constructor(n: string, a: number) {
       this.name = n;
       this.age = a;
   }

   greet(phrase: string) {
       console.log(`${phrase} ${this.name}`);
   }
}

let user1 = new Employee("Rakhshan", 22);
user1.greet("Hi");

interface Employee {
   name: string;
   age: number;
   occupation: string;
}

const employee: Employee = {
   name: "Rakhshan",
   age: 22,
   occupation: "Engineering",
}

// const greetId = (id: (number | string))=>{
   //     console.log(id);
   // }
   
   type GreetArg = number | string;
   const greetId = (id: GreetArg)=>{
       console.log(id);
   }
   
   greetId(12);
   greetId("12");

   
   type Employee = {
       name: string;
       startDate: Date;
   }
   
   interface Manager{
       name: string;
       department: string;
   }
   
   type teamLead = Employee & Manager;
   
   const t: teamLead = {
       name: "Rakhshan",
       startDate: new Date(),
       department: "Software developer",
   }
   
   
   function findGreaterNumber(arr: number[]){
       let ans: number = arr[0];
       for(let i=0; i<arr.length; i++){
           if(arr[i] > ans) ans = arr[i];
       }
       return ans;
   }
   
   const res = findGreaterNumber([4, 1, 2, 8, 9, 10]);
   console.log(res);
   
   interface User{
       firstName: string;
       lastName: string;
       age: number;
   }
   
   function legal(users: User[]){
       for(let i=0; i<users.length; i++){
           if(users[i].age > 18){
               return users[i]
           }
       }
   }
   
   const res = legal([
       {
           firstName: "Rakhshan",
           lastName: "Ahmad",
           age: 22,
       },
       {
           firstName: "Hassan",
           lastName: "Ahmad",
           age: 19,
       },
       {
           firstName: "shaheer",
           lastName: "abbas",
           age: 15,
       },
       {
           firstName: "shayan",
           lastName: "ansari",
           age: 12,
   },
])

console.log(res?.firstName, res?.lastName, res?.age);

enum Direction {
   Up,
   Down, // becomes 1 by default
   Left, // becomes 2
   Right // becomes 3
}

function doSomething(keyPressed: Direction) {
   console.log(keyPressed);
}

doSomething(Direction.Up);
doSomething(Direction.Down);
doSomething(Direction.Left);
doSomething(Direction.Right);


function identity<T>(arg: T){
   return arg;
}

const num = identity<number>(12);
const str = identity<string>("hello");
str.toUpperCase();


function getFirstElement<T>(arr: T[]){
   return arr[0];
}

interface User{
   name: string;
}
// const output1 = getFirstElement(["Rakhshan", "Ahmad", 1, 2, 3, 4]);
// const output2 = getFirstElement<string>(["Rakhshan", "Ahmad"]);
const output3 = getFirstElement<User>([{name: "Rakhshan"}]);
console.log(output3.name);

import express from "express";
const app = express();
*/
function sumOfAge(user1, user2) {
    return user1.age + user2.age;
}
;
// Example usage
const result = sumOfAge({
    name: "harkirat",
    age: 20
}, {
    name: "raman",
    age: 21
});
console.log(result); // Output: 9
