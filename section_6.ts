//? Given a string, find the length of the longest
// substring without repeating characters

//! Constraints
//# 1. Is the substring contiguous(sequential and without breaks in between them)?

/*
Substring vs subsequence (it can skip characters)

"abcbbd"  vs "abcbbd"
abc -> substring vs abcd -> subsequence
*/

// Yes, look for a substring and not a subsequence
// Substring vs subsequence

//# 2. Does case sensitivity matter?
// No

//% Test cases
/*
"abccabb" -> 3
"cccccc" -> 1
"" -> 0
"abcbda" -> 4
*/

const lengthOfLongestSubstring = function (s: string) {
  if (s.length <= 1) return s.length;
  let longest = 0;

  for (let left = 0; left < s.length; left++) {
    let seenChars: {
        [char: string]: boolean;
      } = {},
      currentLength = 0;

    for (let right = left; right < s.length; right++) {
      const currentChar = s[right];

      if (!seenChars[currentChar]) {
        currentLength++;
        seenChars[currentChar] = true;
        longest = Math.max(longest, currentLength);
      } else {
        break;
      }
    }
  }

  return longest;
};

/*
Time: O(n^2)
Space: O(n)
*/

// Sliding windows technique

/*
Form a window over some portion of sequential data, then 
move that window throughout the data to capture different
parts of it
*/

// Use a sliding window to represent the current substring

// The size of the window will change based on new characters
// and characters we've already seen before

// Our seen characters hashmap keeps track of what characters we've seen
// and the index we saw them at

//% Optimized

const lengthOfLongestSubstring_Opt = function (s: string) {
  if (s.length <= 1) return s.length;
  const seenChars: {
    [char: string]: number;
  } = {};
  let left = 0,
    longest = 0;

  for (let right = 0; right < s.length; right++) {
    const currentChar = s[right];
    const prevSeenCharInd: number | undefined = seenChars[currentChar];

    if (prevSeenCharInd >= left) {
      left = prevSeenCharInd + 1;
    }

    seenChars[currentChar] = right;

    longest = Math.max(longest, right - left + 1);
  }

  return longest;
};

//Time: O(n)
//Space: O(n)

//% Optimized with Map
const lengthOfLongestSubstring_Opt2 = function (s: string) {
  if (s.length <= 1) return s.length;

  const seenChars = new Map();
  let left = 0,
    longest = 0;

  for (let right = 0; right < s.length; right++) {
    const currentChar = s[right];
    const prevSeenCharInd: number | undefined = seenChars.get(currentChar);

    if ((prevSeenCharInd as number) >= left) {
      left = (prevSeenCharInd as number) + 1;
    }

    seenChars.set(currentChar, right);

    longest = Math.max(longest, right - left + 1);
  }

  return longest;
};
