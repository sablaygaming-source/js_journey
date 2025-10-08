
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


    data = [{ Name: "ambo", Email: "ambo@1" }, { Name: "bentong", Email: "bentong@1" }];
    headers = Object.keys(data[0]);

    sData = data.map(({ Name, Email }) => {
        return `${Name}, ${Email}`;
    }
    ).join('\n');

    headersS = headers.map((B) => {

        return `${B} `;
    }
    ).join(',');

    headersS += sData;

    console.log("\nsData is ", sData, ", lenght ", sData.length);

    console.log("\nheadersS ", headersS);

    //console.log("\n\nsData typeof ", tData, "\n123 ", typeof 123, "\n45.67 ", typeof 45.67);



    await rl.question("exit prog...\npress any...");
    rl.close();
}

main();


/*  standby codes

    productD = [{ id: "10", item: "safeguard" }, { id: "20", item: "coke" }, { id: "30", item: "pinoybread" }];
    bioD = [{ Name: "abner", email: "abner@1" }, { Name: "beri", email: "beri@1" }, { Name: "carl", email: "carl@1" }];
    transportD = [{ plate: 1010, vehicle: "honda" }, { plate: 2020, vehicle: "isuzu" }, { plate: 3030, vehicle: "nissan" }];

    //rIndex = fFind(await rl.question("input value to find: "), 1, productD.length, productD);

*/








