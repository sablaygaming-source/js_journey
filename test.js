
//"user strict";

const readline = require('readline');

// Setup the readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function inpStr(query) {
    return new Promise(resolve => rl.question(query, resolve));
}


async function main() {

    data = [];
    data.push({ Name: "", Address: "" });
    data[0].Name = await inpStr("Name: ");
    data[0].Address = await inpStr("Address: ");

    console.log("u inputed ", data);
    //array of object to stringCSV
    const headers = Object.keys(data[0]).join(",");
    const rows = data.map(obj => Object.values(obj).join(",")).join("\n");

    subData = `${headers}\n${rows}`;
    console.log("\nresult data \n", subData);

    //now create stringCsv to array of object 
    //pause
    await inpStr("exit prog...");
    rl.close();
}

main();











