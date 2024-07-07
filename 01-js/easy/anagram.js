/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  // edge case
  if (str1.length !== str2.length) return false;

  let lowerStr1 = str1.toLowerCase();
  let lowerStr2 = str2.toLowerCase();

  let map = new Map();

  for(let i=0; i<lowerStr1.length; i++){
    if(map.has(lowerStr1[i])){
      map.set(lowerStr1[i], map.get(lowerStr1[i]) + 1);
    }
    else{
      map.set(lowerStr1[i], 1);
    }
  }

  for(let i=0; i<lowerStr2.length; i++){
    if(map.has(lowerStr2[i])){
      map.set(lowerStr2[i], map.get(lowerStr2[i]) - 1);
    }
  }

  let keys = map.keys();
  for(let key of keys){
    if(map.get(key) != 0) return false;
  }
  return true;
}

module.exports = isAnagram;
