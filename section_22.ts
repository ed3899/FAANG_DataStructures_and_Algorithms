/**
 * Implementing a priority queue
 */

export class PriorityQueue {
  private heap: number[];
  private comparator: (_a: number, _b: number) => boolean;

  constructor(_comparator = (_a: number, _b: number) => _a > _b) {
    this.heap = [];
    this.comparator = _comparator;
  }

  size(): number {
    return this.heap.length;
  }

  isEmpty(): boolean {
    return this.size() === 0;
  }

  isNotEmpty(): boolean {
    return !this.isEmpty();
  }

  peek(): number {
    return this.heap[0];
  }

  push(value: number) {
    this.heap.push(value);
    this.siftUp();
    return this.size();
  }

  pop() {
    if (this.size() > 1) {
      this.swap(0, this.size() - 1);
    }

    const poppedValue = this.heap.pop();
    this.siftDown();
    return poppedValue;
  }
  /**
   *
   * @param idx
   * @returns Index of the parent
   */
  private parent(idx: number): number {
    return Math.floor((idx - 1) / 2);
  }

  private leftChild(idx: number): number {
    return idx * 2 + 1;
  }

  private rightChild(idx: number): number {
    return idx * 2 + 2;
  }

  private swap(i: number, j: number): void {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  private compare(i: number, j: number): boolean {
    return this.comparator(this.heap[i], this.heap[j]);
  }

  private siftUp() {
    let nodeIdx = this.size() - 1;
    const nodeIsGreaterThanParent: () => boolean = () =>
      this.compare(nodeIdx, this.parent(nodeIdx));

    while (nodeIdx > 0 && nodeIsGreaterThanParent()) {
      this.swap(nodeIdx, this.parent(nodeIdx));
      nodeIdx = this.parent(nodeIdx);
    }
  }

  private siftDown() {
    let nodeIdx = 0;
    const leftChildInArray: () => boolean = () =>
      this.leftChild(nodeIdx) < this.size();
    const rightChildInArray: () => boolean = () =>
      this.rightChild(nodeIdx) < this.size();
    const leftChildGreaterThanCurrent: () => boolean = () =>
      this.compare(this.leftChild(nodeIdx), nodeIdx);
    const rightChildGreaterThanCurrent: () => boolean = () =>
      this.compare(this.rightChild(nodeIdx), nodeIdx);

    while (
      (leftChildInArray() && leftChildGreaterThanCurrent()) ||
      (rightChildInArray() && rightChildGreaterThanCurrent())
    ) {
      const rightChildIsGreaterThanLeft: () => boolean = () =>
        this.compare(this.rightChild(nodeIdx), this.leftChild(nodeIdx));

      const greaterNodeIdx: () => number = () =>
        rightChildInArray() && rightChildIsGreaterThanLeft()
          ? this.rightChild(nodeIdx)
          : this.leftChild(nodeIdx);

      this.swap(greaterNodeIdx(), nodeIdx);
      nodeIdx = greaterNodeIdx();
    }
  }
}
// const pq = new PriorityQueue();
// const n = [15, 12, 10, 7, 3, 5];
// n.forEach(v => pq.push(v));

// console.log(pq.peek());
// pq.push(45);
// console.log(pq.peek());
// pq.pop();
// console.log(pq.peek());
