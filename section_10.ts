/*
Given a doubly linked list, list nodes also have a child
property that can point to a separate double linked list.

These child list can also have one or more child double linked list
of their own, and so on.

Return the list as a single level flattened double linked list.
*/

//! Constraints
/*
Can a doubly linked list have multiple child list nodes?
Yes, every list node can have multiple levels of children

What do we do with child properties after flattening?
Just set it to null
*/

//% Test cases

/*

*/

type multiLevelArray = (number | multiLevelArray)[];

class ListNode<T> {
  val: T;
  next: ListNode<number> | null;
  prev: ListNode<number> | multiLevelArray | null;
  child: ListNode<number> | multiLevelArray | null;

  constructor(val: T, next = null, prev = null, child = null) {
    this.val = val;
    this.next = null;
    this.prev = null;
    this.child = null;
  }
}

const nodes: multiLevelArray = [
  1,
  [2, 7, [8, 10, 11], 9],
  3,
  4,
  [5, 12, 13],
  6,
];

const buildMultilevel = function (
  nodes: multiLevelArray
): multiLevelArray | ListNode<number> {
  const head = new ListNode(nodes[0]);
  let currentNode = head;

  for (let i = 1; i < nodes.length; i++) {
    const val = nodes[i];
    let nextNode: ListNode<number> | multiLevelArray;

    if (Array.isArray(val)) {
      nextNode = buildMultilevel(val) as multiLevelArray;
      currentNode.child = nextNode;
      continue;
    }

    nextNode = new ListNode(val);
    currentNode.next = nextNode;
    nextNode.prev = currentNode as ListNode<number>;
    currentNode = nextNode;
  }

  return head as ListNode<number>;
};

let multiLinkedList = buildMultilevel(nodes) as ListNode<number>;

// ---- Generate our linked list ----
const printListMulti = (head: ListNode<number> | multiLevelArray | null) => {
  if (!head) {
    return;
  }

  console.log((head as ListNode<number>).val);

  if ((head as ListNode<number>).child) {
    printListMulti((head as ListNode<number>).child);
  }

  printListMulti((head as ListNode<number>).next);
};

const printList = (head: ListNode<number> | null) => {
  if (!head) return;

  console.log(head.val);

  printList(head.next as ListNode<number>);
};

const flatten = function (head: ListNode<number>): ListNode<number> | null {
  if (!head) return head;

  let currentNode: ListNode<number> | null = head;

  while (currentNode !== null) {
    if (currentNode.child === null) {
      currentNode = currentNode.next;
    } else {
      let tail = currentNode.child as ListNode<number>;

      while ((tail as ListNode<number>).next !== null) {
        tail = (tail as ListNode<number>).next!;
      }

      (tail as ListNode<number>).next = currentNode.next;

      if ((tail as ListNode<number>).next !== null) {
        (tail as ListNode<number>).next!.prev = tail;
      }

      currentNode.next = currentNode.child as ListNode<number>;
      currentNode.next.prev = currentNode;
      currentNode.child = null;
    }
  }

  return head;
};

// Time: O(2n) -> O(n)
// Space: O(1)

printListMulti(multiLinkedList);
console.log("after flatten");
printList(flatten(multiLinkedList));
