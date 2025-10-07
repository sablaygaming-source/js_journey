
//"user strict";
const fs = require('fs');

const readline = require('readline').promises;
// Setup the readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/*
function inpStr(query) {
    return new Promise(resolve => rl.question(query, resolve));
}
*/
async function readF(fileT, contF) {
    dataF = null;
    try {
        dataF = await fs.readFile(fileT, contF);

    } catch (error) {
        console.error("from RSM error: ", error.message);
    }

    return new Promise(() => dataF);
}

async function main() {

    firT = await rl.question("FileName: ");

    retD = await readF(firT, 'utf8');
    console.log("\nretD result ", retD);
    await rl.question("exit prog...");
    rl.close();
}

main();











