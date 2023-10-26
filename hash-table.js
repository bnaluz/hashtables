const sha256 = require('js-sha256');

class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable {
  constructor(numBuckets = 4) {
    this.data = new Array(numBuckets).fill(null);
    this.count = 0;
    this.capacity = numBuckets;
  }

  hash(key) {
    let hashed = sha256(key).slice(0, 8);
    return parseInt(`0x${hashed}`);
  }

  hashMod(key) {
    return this.hash(key) % this.capacity;
  }

  insertNoCollisions(key, value) {
    // this.count++;
    // let index = this.hashMod(key);
    // let newPair = new KeyValuePair(key, value)

    // this.data[index] = newPair;
    let index = this.hashMod(key);
    if (!this.data[index]) {
    this.count++;

    let newPair = new KeyValuePair(key, value);

    this.data[index] = newPair;
    } else {
      throw new Error("hash collision or same key/value pair already exists!")
    }


  }

  insertWithHashCollisions(key, value) {
    let index = this.hashMod(key);
    let newPair = new KeyValuePair(key, value);

    if (!this.data[index]) {
      this.count++;

      this.data[index] = newPair;
      } else {
        this.count++;
        let oldIndex = this.data[index];
        this.data[index] = newPair;
        this.data[index].next = oldIndex;
  }

}

  insert(key, value) {
    let index = this.hashMod(key);
    let newPair = new KeyValuePair(key, value);

    if (this.data[index].key === key) {
      this.data[index].value = value;
    }
  }
}

let hashTable = new HashTable(2);

module.exports = HashTable;
