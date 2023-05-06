
const rd = require("readline")

async function askUser(text) {
    let test;
    const rl = rd.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    const prompt = (query) => new Promise((resolve) => rl.question(query, resolve));
    test = await prompt(text);
    rl.close();
    return test;
}


module.exports = {askUser}