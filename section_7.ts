/*
Given a string, determine if it is a palindrome,
considering only alphanumeric characters and 
ignoring case sensitivity
*/

//! Constraints are already implicity in the question

//% Test cases:

/*
"aabaa" -> True
"aabbaa" -> True
"abc" -> False
"a" -> True
"" -> True
"A man, a plan, a canal: Panama" -> True

*/

const string = "A man, a plan, a canal: Panama";

//? Solutions:

// 2 pointers from outside
const isValidPalindrome = function (s: string) {
  s = s.replace(/[^A-Za-z0-9]/g, "").toLowerCase();

  //initialize left/right pointers at the start and end of string respectively

  let left = 0,
    right = s.length - 1;

  //loop through string characters while comparing them,
  // then move the pointers closer to the center

  while (left < right) {
    if (s[left] !== s[right]) return false;

    left++;
    right--;
  }

  return true;
};

/*
Given a string, determine if it is almost a palindrome.
A string is almost a palindrome if it becomes a palindrome by
removing one letter.

Consider only alphanumeric characters and ignore
case sensitivity
*/

//! Constraints

/*
Do we consider a palindrome as almost a palindrome? -> Yes

*/

//% Test cases
/*
"raceacar" -> True
"abccdba" -> True
"abcdefdba" -> False
"" -> True
"a" -> True
"ab" -> True
*/

//? Solution

const validSubPalindrome = function (s: string, leftP: number, rightP: number) {
  while (leftP < rightP) {
    if (s[leftP] !== s[rightP]) return false;

    leftP++;
    rightP--;
  }
  return true;
};

const isAlmostPalindrome = function (s: string) {
  let left = 0,
    right = s.length - 1;

  while (left < right) {
    if (s[left] !== s[right]) {
      return (
        validSubPalindrome(s, left + 1, right) ||
        validSubPalindrome(s, left, right - 1)
      );
    }

    left++;
    right--;
  }

  return true;
};

//Time : O(n)
//Space: O(1)
