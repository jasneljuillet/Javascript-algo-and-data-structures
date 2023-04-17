/*
Reverse the provided string and return the reversed string.
For example, "hello" should become "olleh".
*/

function reverseToString(str) {
  return str.split("").reverse().toString().replace(/,/g, "");
}

reverseToString("hello");
