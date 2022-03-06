/*
Given a string containing only parentheses,
determine if it valid. The string is valid if all
parentheses close
*/

//!Constraints
/*
Does an empty string count as valid?
*/

//% Test cases
/*
"" -> True
"{([])}" -> True
"{([]" -> False
"{[(]}" -> False
"{[]()}" -> True
*/

const parens: {[c: string]: string} & Object = {
  "(": ")",
  "[": "]",
  "{": "}",
};

const isValidParentheses = function (s: string) {
  if (s.length === 0) return true;
  const stack: Array<string> = [];

  for (let i = 0; i < s.length; i++) {
    //Checking if the key exist (right part)

    if (parens.hasOwnProperty(s[i])) {
      stack.push(s[i]);
    } else {
      const leftBracket = stack.pop();
      const correctBracket = parens[leftBracket as string];

      if (s[i] !== correctBracket) return false;
    }
  }

  //Stack must be empty
  return stack.length === 0;
};

console.log(isValidParentheses("{([])}"));

//Time : O(n)
//Space: O(n)
