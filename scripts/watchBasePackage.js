const runScript = require("./runScript");

const packageNames = ["cookerjs", "cookerjs-react"];

async function main() {
  runScript("clean", packageNames);
  runScript("start", packageNames, true);
}

main();
