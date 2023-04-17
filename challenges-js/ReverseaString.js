/*
Reverse the provided string and return the reversed string.
For example, "hello" should become "olleh".
*/

const log = console.log;

function reverseToString(str) {
  return str.split("").reverse().toString().replace(/,/g, "");
}

log(reverseToString("hello"));
