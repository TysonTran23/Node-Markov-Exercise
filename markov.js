/** Textual markov chain generator */

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter((c) => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO
    let chains = new Map();
    for (let i = 0; i < this.words.length; i++) {
      let word = this.words[i];
      let nextWord = this.words[i + 1];
      if (chains.has(word)) {
        chains.get(word).push(nextWord);
      } else {
        chains.set(word, [nextWord]);
      }
    }
    this.chains = chains;
  }

  /** Pick random choice from array */
  static randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO
    let keys = Array.from(this.chains.keys());
    let key = MarkovMachine.randomChoice(keys);
    let out = [];

    while (out.length < numWords && key !== null) {
      key = MarkovMachine.randomChoice(this.chains.get(key));
    }
    return out.join(" ");
  }
}

module.exports = {
  MarkovMachine,
};
