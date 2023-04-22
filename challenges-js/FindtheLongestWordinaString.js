/**
 * Return the length of the longest word in the provided sentence.

Your response should be a number.
 */

function findLongestWordLength(str) {
  str = str.split(" ");

  let longest = str[0];
  for (let i = 0; i < str.length; i++) {
    if (longest.length < str[i].length) {
      longest = str[i];
    }
  }
  return longest.length;
}

findLongestWordLength("The quick brown fox jumped over the lazy dog");
