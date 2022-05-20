const readline = require("readline");
const utils = require("util");

const { stdin: input, stdout: output } = require("process");

const rl = readline.createInterface({ input, output });

const question = utils.promisify(rl.question).bind(rl);

(async () => {
  const answer = await question("What do you think of Node.js? ");

  console.log(`Thank you for your valuable feedback: ${answer}`);
})();
