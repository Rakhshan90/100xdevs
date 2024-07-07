/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  const reversedString = str
    .toLowerCase()
    .replace(/[^\w]/g, "")
    .split("")
    .reverse()
    .join("");
  let start = 0;
  let end = reversedString.length - 1;
  while( start < end ){
    if(reversedString[start] != reversedString[end]) return false;
    start++, end--;
  }
  return true;
}

module.exports = isPalindrome;
