/*
Given a binary tree, find its maximum depth

Maximum depth is the number of nodes along
the longest path from the root node to the 
furthest leaf node
*/

//! Constraints

/*
What do we return if the tree is empty? -> 0

*/

//% Test cases

/*
Look in the video
*/

/**
 * Comparator for binary search tree. Places lower and equal values to the left of the root
 * and higher ones to the right.
 * @param a
 * @param b
 * @returns
 */
export const comparator = (a: number, b: number) => {
  if (a < b) return -1;

  if (a > b) return 1;

  return 0;
};

export class BinarySearchTreeNode<T> {
  data: T;
  leftNode?: BinarySearchTreeNode<T>;
  rightNode?: BinarySearchTreeNode<T>;

  constructor(data: T) {
    this.data = data;
  }
}

export class BinarySearchTree<T> {
  root?: BinarySearchTreeNode<T>;
  comparator: (a: T, b: T) => number;

  constructor(comparator: (a: T, b: T) => number) {
    this.comparator = comparator;
  }

  insert(data: T): BinarySearchTreeNode<T> | undefined {
    if (!this.root) {
      this.root = new BinarySearchTreeNode(data);
      return this.root;
    }

    let current = this.root;

    while (true) {
      if (this.comparator(data, current.data) === 1) {
        if (current.rightNode) {
          current = current.rightNode;
        } else {
          current.rightNode = new BinarySearchTreeNode(data);
          return current.rightNode;
        }
      } else {
        if (current.leftNode) {
          current = current.leftNode;
        } else {
          current.leftNode = new BinarySearchTreeNode(data);
          return current.leftNode;
        }
      }
    }
  }

  /**
   * An array of arrays representing the nodes at each level. The
   * sub-arrays indexes represent the levels. Works best when the tree
   * is skewed
   *
   * Time - O(n)
   * Space - O(w) width of the tree
   *
   * @returns An array of arrays
   */
  breadFirstSearch(): T[] | -1 {
    if (!this.root) return -1;
    let currentNode = this.root;
    let list: T[] = [];
    let queue: Array<BinarySearchTreeNode<T>> = [];

    queue.push(currentNode);

    while (queue.length > 0) {
      currentNode = queue.shift() as BinarySearchTreeNode<T>;
      list.push(currentNode.data);

      if (currentNode.leftNode) {
        queue.push(currentNode.leftNode);
      }

      if (currentNode.rightNode) {
        queue.push(currentNode.rightNode);
      }
    }

    return list;
  }

  //Depth First Search -> 3 ways to implement
  /**
   *    101
   *   /   \
   *  33   105
  Should yield 33,101,105
   * @param node 
   * @param list - Stored in memory array
   */
  inOrderTraversal(
    node: BinarySearchTreeNode<T> | undefined,
    list: Array<T>
  ): Array<T> {
    if (node) {
      if (node.leftNode) {
        this.inOrderTraversal(node.leftNode, list);
      }

      list.push(node.data);

      if (node.rightNode) {
        this.inOrderTraversal(node.rightNode, list);
      }
    }
    return list;
  }

  /**
   *   101
   *  /   \
   * 33   105
   * Should yield 101,33,105
   * @param node
   * @param list - Stored in memory array
   */
  preOrderTraversal(
    node: BinarySearchTreeNode<T> | undefined,
    list: Array<T>
  ): Array<T> {
    if (node) {
      list.push(node.data);
      if (node.leftNode) {
        this.preOrderTraversal(node.leftNode, list);
      }
      if (node.rightNode) {
        this.preOrderTraversal(node.rightNode, list);
      }
    }
    return list;
  }

  /**
   *   101
   *  /   \
   * 33   105
   * Should yield 33,105,101
   * @param node
   * @param list - Stored in memory array
   */
  postOrderTraversal(
    node: BinarySearchTreeNode<T> | undefined,
    list: Array<T>
  ): Array<T> {
    if (node) {
      if (node.leftNode) {
        this.postOrderTraversal(node.leftNode, list);
      }

      if (node.rightNode) {
        this.postOrderTraversal(node.rightNode, list);
      }

      list.push(node.data);
    }
    return list;
  }

  /**
   * Based on the idea that the first element that we see on a level, will be
   * the right most element. It only adds values to the array if the level is >= than
   * the length of the array.
   *
   * Worst case the tree is skewed to the left and it gives us a time of O(n).
   * Space is also O(n) or O(h) height of the tree
   *
   * It works best with full balanced trees
   */
  rightPreOrderTraversal() {
    const result: Array<T> = [];

    this.dfs(this.root!, 0, result);

    return result;
  }

  /**
   * A helper function that allows us to traverse NRL. Neccesary because of the "this" 
   * context
   * 
   * @param node Current node
   * @param currentLevel Level of the tree
   * @param result Array with results
   * @returns Right side view of a tree
   */
  private dfs(
    node: BinarySearchTreeNode<T>,
    currentLevel: number,
    result: Array<T>
  ) {
    if (!node) return;

    if (currentLevel >= result.length) result.push(node.data);

    if (node.rightNode) this.dfs(node.rightNode, currentLevel + 1, result);

    if (node.leftNode) this.dfs(node.leftNode, currentLevel + 1, result);
  }

  
}

const bst = new BinarySearchTree(comparator);
const n = [9, 4, 6, 20, 170, 15, 1];

n.forEach(n => {
  bst.insert(n);
});

/**
 * Time is O(n). Space is O(log n) and worst is O(n) when the tree is unbalanced
 * @param currentDepth
 * @param node
 * @returns The max depth of a tree
 */
const maxDepth = function <T>(
  currentDepth: number,
  node?: BinarySearchTreeNode<T>
): number {
  if (!node) return currentDepth;
  currentDepth++;
  return Math.max(
    maxDepth(currentDepth, node.leftNode),
    maxDepth(currentDepth, node.rightNode)
  );
};
