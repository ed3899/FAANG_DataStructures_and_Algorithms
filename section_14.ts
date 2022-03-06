/*

Implement the class Queue using stacks. 
The queue methods you need to implement are
enqueue, dequeue, peek and empty.

*/

//! Constraints

/*
Do the queue methods we have to implement need to perform
at the same complexity of a real queue?

No but they should be as performant as possible
*/

class QueueWithStacks<T> {
  in: Array<T>;
  out: Array<T>;

  constructor() {
    this.in = [];
    this.out = [];
  }

  enqueue(val: T) {
    this.in.push(val); //O(n) both space and time
  }

  dequeue(): T {
    if (this.out.length === 0) {
      while (this.in.length) {
        this.out.push(this.in.pop() as T); //O(n) time
      }
    }
    return this.out.pop() as T;
  }

  peek(): T {
    if (this.out.length === 0) {
      while (this.in.length) {
        this.out.push(this.in.pop() as T); //O(n) time
      }
    }

    return this.out[this.out.length - 1];
  }

  empty(): boolean { 
    return this.out.length === 0 && this.in.length === 0; //O(1)
  }
}
