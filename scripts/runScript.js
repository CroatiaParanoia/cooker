const child_process = require("child_process");
const { promisify } = require("util");

const exec = promisify(child_process.exec);

const createCmdItem = (cmd, package) => {
  return `lerna run ${cmd} --scope=${package}`;
};

async function runScript(cmd, packages, useConcurrently = false) {
  if (useConcurrently) {
    const cmdStr = packages.map((v) => `"${createCmdItem(cmd, v)}"`).join(" ");

    await exec(`concurrently ${cmdStr}`);
  } else {
    for (let i = 0; i < packages.length; i++) {
      const item = packages[i];

      await exec(createCmdItem(cmd, item));
    }
  }
}

module.exports = runScript;
