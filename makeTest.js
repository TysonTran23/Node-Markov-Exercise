const fs = require("fs");
const process = require("process");
const axios = require("axios");
const markov = require("./markov");

function generateText(text) {
  let mm = markov.MarkovMachine(text);
  console.log(mm.makeText());
}

function makeText(path) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.log(`Cannot read file: ${path}: ${err}`);
      process.exit(1);
    } else {
      generateText(data);
    }
  });
}

async function makeURLText(url) {
  let response;
  try {
    response = await axios.get(url);
  } catch (err) {
    console.log(`Cannot read URL ${url}: ${err}`);
    process.exit(1);
  }
  generateText(response.data);
}

let [method, path] = process.argv.slice(2);

if (method === "file") {
  makeText(path);
}
if (method === "url") {
  makeURLText(path);
} else {
  console.log(`Unknown Method ${method}`);
  process.exit(1);
}
