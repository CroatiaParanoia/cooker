const runScript = require("./runScript");

const packageNames = ["cookerjs", "cookerjs-react"];

async function main() {
  await runScript("clean", packageNames);
  await runScript("build", packageNames);
}

main();
