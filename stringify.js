
//"user strict";
const fs = require('fs');
const { stringify } = require('querystring');

const readline = require('readline').promises;
// Setup the readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function main() {


    data = [{ Name: "ambo", email: "ambo@1" }, { Name: "bentong", email: "bentong@1" }];
    sData = JSON.stringify(data);
    tData = typeof (sData);
    console.log(`\ndata normal str ${data}`);
    console.log(`\ndata normal str ${sData}`);
    console.log("\n\nsData typeof ", tData, "\n123 ", typeof 123, "\n45.67 ", typeof 45.67);

    if (typeof 456 == typeof 123) {
        console.log("\ntrue");
    } else {
        console.log("\nfalse");
    }

    //console.log("\n\ndata stirngly ", JSON.stringify(data));

    await rl.question("exit prog...\npress any...");
    rl.close();
}

main();
