class Person {
  name: string;
  isAlive: boolean;
  children: Person[];

  constructor(_name: string) {
    this.name = _name;
    this.isAlive = true;
    this.children = [];
  }
}

class Monarchy {
  king: Person;
  private persons: {[i: string]: Person};

  constructor(_kingsName: string) {
    //Set king
    this.king = new Person(_kingsName);

    //Set kings name on hashmap
    this.persons = {
      [this.king.name]: this.king,
    };
  }

  private dfs(_currentPerson: Person, order: string[]): void {
    //Only push if Alive
    if (_currentPerson.isAlive) {
      order.push(_currentPerson.name);
    }

    //Look for children, LNR
    for (let i = 0; i < _currentPerson.children.length; i++) {
      this.dfs(_currentPerson.children[i], order);
    }
  }

  birth(_childName: string, _parentName: string): void {
    //Get entities
    const parent = this.persons[_parentName];
    const newChild = new Person(_childName);

    //Push to array and set to hashmap
    parent.children.push(newChild);
    this.persons[_childName] = newChild;
  }

  death(_name: string): void | null {
    const person = this.persons[_name];

    //Check if exists
    if (person === undefined) return null;

    person.isAlive = false;
  }

  getOrderOfSuccession() {
    const order: string[] = [];

    //Perform PREORDER dfs
    this.dfs(this.king, order);

    return order;
  }
}

const mon = new Monarchy("Jake");
mon.birth("Catherine", "Jake");
mon.birth("Tom", "Jake");
mon.birth("Celine", "Jake");
mon.birth("Peter", "Celine");
mon.birth("Jane", "Catherine");
mon.birth("Farah", "Jane");
mon.birth("Mark", "Catherine");
console.log(mon.getOrderOfSuccession());

mon.death("Jake");
mon.death("Jane");

console.log(mon.getOrderOfSuccession());
