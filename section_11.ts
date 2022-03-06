//Cycle detection

class Node<T> {
  val: T;
  next: Node<T> | null;

  constructor(val: T, next = null) {
    this.val = val;
    this.next = next;
  }
}

//? Solution
//Naive approach
const findCycle = function (head: Node<number>): Node<number> | boolean {
  let currentNode: Node<number> = head;
  const seenNodes: Set<Node<number>> = new Set();

  while (!seenNodes.has(currentNode)) {
    if (currentNode.next === null) return false;

    seenNodes.add(currentNode);
    currentNode = currentNode.next;
  }

  return currentNode;
};

// Time -> O(n)
// Space -> O(n)

//? Solution 2
//Floyd's Tortoise and Hare algorithm
const findCycleOpt = function (head: Node<number> | null) {
  if (head === null) return false;

  let hare: Node<number> | null = head,
    tortoise: Node<number> | null = head;

  while (true) {
    hare = hare!.next;
    tortoise = tortoise!.next;

    if (hare === null || hare.next === null) return false;

    hare = hare!.next;

    if (tortoise === hare) break;
  }

  //Once both hare and tortoise are the same, we want to know the "c" distance

  let p1: Node<number> | null = head,
    p2: Node<number> | null = tortoise;

  while (p1 !== p2) {
    p1 = p1!.next;
    p2 = p2!.next;
  }

  return p1;
};

// Time -> O(n)
// Space -> O(1)
