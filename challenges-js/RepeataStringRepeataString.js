/*

Repeat a given string str (first argument) for num times (second argument). 
Return an empty string if num is not a positive number. For the purpose of this challenge, 
do not use the built-in .repeat() method.

*/
function repeatStringNumTimes(str, num) {
  let r = [];
  for (let i = 0; i < num; i++) {
    r.push(str);
  }

  return r.toString().replace(/,/g, "");
}

console.log(repeatStringNumTimes("*", 3));
