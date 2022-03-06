/*
Given a string only containing round brackets
'(' and ')' lowercase characters, remove the
least amount of brackets so the string is valid.

A string is considered valid if it is empty of if there
are brackets, they all close


*/

//! Constraints

/*
Return a valid string with the fewest brackets removed
There won't be space in the string, the string only contains lowercase characters, '(' and ')'
You don't need any brackets for a string to be valid
*/

//% Test cases

/*
"a)bc(d)" -> "abc(d)"

"(ab(c)a" -> "ab(c)a" or "(abc)a"

"))((" -> " "
*/

const minRemoveToMakeValid = function (str: string) {
  const res = str.split("");
  const stack: Array<number> = [];

  for (let i = 0; i < res.length; i++) {
    if (res[i] === "(") {
      stack.push(i);
    } else if (res[i] === ")" && stack.length) {
      stack.pop();
    } else if (res[i] === ")") {
      res[i] = "";
    }
  }

  while (stack.length) {
    const currIdx = stack.pop();
    res[currIdx as number] = "";
  }

  return res.join("");
};

console.log(
  minRemoveToMakeValid("a)bc(d)"),
  minRemoveToMakeValid("(ab(c)a"),
  minRemoveToMakeValid("))((")
);
// Time: O(n)
// Space : O(n)
