class TrieNode {
  end: boolean;
  keys: {[i: string]: InstanceType<typeof TrieNode>};

  constructor() {
    //Needed for end of word
    this.end = false;
    this.keys = {};
  }
}

class Trie {
  root: InstanceType<typeof TrieNode>;

  constructor() {
    this.root = new TrieNode();
  }

  /**
   * Starts inserting from the root
   * @param _word
   * @param _node
   */
  insert(
    _word: string,
    _node: InstanceType<typeof TrieNode> = this.root
  ): void {
    if (_word.length === 0) {
      _node.end = true;
      return;

      //No letter found in keys
    } else if (!_node.keys[_word[0]]) {
      //create new initial node
      _node.keys[_word[0]] = new TrieNode();

      //insert throughout the tree
      this.insert(_word.substring(1), _node.keys[_word[0]]);
    } else {
      //if it does exist, skip the preexisting letter
      this.insert(_word.substring(1), _node.keys[_word[0]]);
    }
  }

  insert2(word: any, node = this.root) {
    if (word.length === 0) {
      node.end = true;
      return;
    } else if (!node.keys[word[0]]) {
      node.keys[word[0]] = new TrieNode();
      this.insert(word.substring(1), node.keys[word[0]]);
    } else {
      this.insert(word.substring(1), node.keys[word[0]]);
    }
  }

  search(
    word: string,
    node: InstanceType<typeof TrieNode> = this.root
  ): boolean {
    //Reached the end of a word
    if (word.length === 0 && node.end) {
      return true;

      //Reach last letter but it is not the end
    } else if (word.length === 0) {
      return false;

      //Letter is not at the node
    } else if (!node.keys[word[0]]) {
      return false;
      //Traverse through
    } else {
      console.log(word);
      return this.search(word.substring(1), node.keys[word[0]]);
    }
  }

  search2(word: any, node = this.root) {
    if (word.length === 0 && node.end) {
      return true;
    } else if (word.length === 0) {
      return false;
    } else if (!node.keys[word[0]]) {
      return false;
    } else {
      return this.search(word.substring(1), node.keys[word[0]]);
    }
  }

  startsWith(
    _prefix: string,
    _node: InstanceType<typeof TrieNode> = this.root
  ): boolean {
    if (_prefix.length === 0) {
      return true;

      //No letter found at the node keys
    } else if (!_node.keys[_prefix[0]]) {
      return false;

      //keep traversing
    } else {
      return this.startsWith(_prefix.substring(1), _node.keys[_prefix[0]]);
    }
  }
}

class TrieNode2 {
  end: any;
  keys: any;
  constructor() {
    this.end = false;
    this.keys = {};
  }
}

class Trie2 {
  root: any;
  constructor() {
    this.root = new TrieNode2();
  }

  insert(word: any, node = this.root) {
    if (word.length === 0) {
      node.end = true;
      return;
    } else if (!node.keys[word[0]]) {
      node.keys[word[0]] = new TrieNode2();
      this.insert(word.substring(1), node.keys[word[0]]);
    } else {
      this.insert(word.substring(1), node.keys[word[0]]);
    }
  }

  search(word: any, node = this.root): any {
    if (word.length === 0 && node.end) {
      return true;
    } else if (word.length === 0) {
      return false;
    } else if (!node.keys[word[0]]) {
      return false;
    } else {
      return this.search(word.substring(1), node.keys[word[0]]);
    }
  }

  startsWith(prefix: any, node = this.root): any {
    if (prefix.length === 0) {
      return true;
    } else if (!node.keys.hasOwnProperty(prefix[0])) {
      return false;
    } else {
      return this.startsWith(prefix.substring(1), node.keys[prefix[0]]);
    }
  }
}

const trie = new Trie();

trie.insert("apple");
console.log(trie.search("apple")); // returns true
console.log(trie.search("app")); // returns false
console.log(trie.startsWith("app")); // returns true
trie.insert("dog");
trie.insert("app");
console.log(trie.search("app"));
