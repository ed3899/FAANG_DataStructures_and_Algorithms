/*
Given two strings S and T, return if they are equal
when both are typed out. Any '#' that appears
in the string counts as a backspace

e.g: "ab#c" -> "ac"
*/

//! Constraints
// What happens when two ## appear beside each other?
// Delete the two values before the first #

// What happens when there is no character to remove?
// It deletes nothing then
// "a###b" -> "b"

// Are two empty strings equal to each other?
// Yes
// "x#y#z#" = "a#"

// Does case sensitivity matters?
// Yes
// "a" !== "A"

//% Test cases

// S: "ab#z"  T:"az#z" True
// S: "abc#d" T:"acc#c" False
// S: "x#y#z#"  T:"a#"  True
// S: "a###b" T:"b" True
// S: "Ab#z"  T:"ab#z"  False

const S_test1 = "ab#z";
const T_test1 = "az#z";
const S_test2 = "abc#d";
const T_test2 = "acc#c";
const S_test3 = "x#y#z#";
const T_test3 = "a#";
const S_test4 = "a###b";
const T_test4 = "b";
const S_test5 = "Ab#z";
const T_test5 = "ab#z";

const middleString = function (string: string) {
  const builtArray = [];
  for (let p = 0; p < string.length; p++) {
    if (string[p] !== "#") {
      builtArray.push(string[p]);
    } else {
      builtArray.pop();
    }
  }
  return builtArray;
};

const backSpaceCompare = function (s: string, t: string) {
  const finalS = middleString(s); //O(a)
  const finalT = middleString(t); //O(b)

  if (finalS.length !== finalT.length) return false;

  for (let p = 0; p < finalS.length; p++) {
    if (finalS[p] !== finalT[p]) return false; //O(a) or O(b)
  }
  return true;
};

// O(2a+b) or O(a+2b)

// T:O(a+b)
// S:O(a+b)
console.log(
  backSpaceCompare(S_test1, T_test1),
  backSpaceCompare(S_test2, T_test2),
  backSpaceCompare(S_test3, T_test3),
  backSpaceCompare(S_test4, T_test4),
  backSpaceCompare(S_test5, T_test5)
);

//? Optimized solution

const backSpaceCompare_Optimized = function (S: string, T: string) {
  let p1 = S.length - 1,
    p2 = T.length - 1;

  while (p1 >= 0 || p2 >= 0) {
    if (S[p1] === "#" || T[p2] === "#") {
      if (S[p1] === "#") {
        let backCount = 2;
        while (backCount > 0) {
          p1--;
          backCount--;
          if (S[p1] === "#") {
            backCount = backCount + 2;
          }
        }
      }

      if (T[p2] === "#") {
        let backCount = 2;
        while (backCount > 0) {
          p2--;
          backCount--;
          if (T[p2] === "#") {
            backCount = backCount + 2;
          }
        }
      }
    } else {
      if (S[p1] !== T[p2]) return false;
      p1--;
      p2--;
    }
  }

  return true;
};

// T: O(a+b)
// S: O(1)