/*
Given a linked list and numbers 'm' and 'n',
return it back only with positions 'm' to 'n' in reverse

1 -> 2 -> 3 -> 4 -> 5
m=2
n=4

1 -> 4 -> 3 -> 2 -> 5
*/

//! Constraints
/*
Will 'm' and 'n' always be within the bounds
of the linked list?
Yes, assume 1 <= m <= n <= length of linked list

Can we receive values 'm' and 'n' for the whole linked list?
Yes, we can receive m = 1 and n = length of linked list.

*/

//% Test cases:
/*

1 -> 2 -> 3 -> 4 -> 5
m=2
n=4

1 -> 4 -> 3 -> 2 -> 5

--

1 -> 2 -> 3 -> 4 -> 5
m=1
n=5

5 -> 4 -> 3 -> 2 -> 1

--

5
m=1
n=1

--

null
m=0
n=0
*/
import {LinkedList, LinkedNode} from "./section_8";

const reverseBetween = function (
  head: LinkedNode<number> | null,
  m: number,
  n: number
) {
  let currentPosition = 1,
    currentNode = head,
    start = head,
    newList: LinkedNode<number> | null = null,
    tail = currentNode;

  //Get the value of start equal to m-1 and currentNode and currentPosition to m
  while (currentPosition < m) {
    start = currentNode;
    currentNode = currentNode!.next;
    currentPosition++;
  }

  while (currentPosition >= m && currentPosition <= n) {
    const next = currentNode!.next;
    currentNode!.next = newList;
    newList = currentNode;
    //currentNode will be equal to n+1 at the end
    currentNode = next;
    currentPosition++;
  }

  start!.next = newList;
  tail!.next = currentNode;

  // Condition for pointers
  if (m > 1) {
    return head;
  } else {
    return newList;
  }
};

//Time O(n)
//Space O(1)
