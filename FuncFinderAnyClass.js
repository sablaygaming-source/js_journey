
//"user strict";
const fs = require('fs');

const readline = require('readline').promises;
// Setup the readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//copy only this function
//flexible array of Object index finder
//paramter sCompare as string, iKey as number, nLen as number, pData as object
//return value number
function fFind(sCompare, iKey, nLen, pData) {

    for (i = 0; i < nLen; i += 1) {

        vCompare = Object.values(pData[i]);
        if (vCompare.length <= iKey) {
            return null;
        }
        //debuger output
        //console.log("\ni ", i, "\nvCompare[iKey] ", vCompare[iKey], ", sCompare ", sCompare);

        if (vCompare[iKey].toString().toUpperCase() == sCompare.toUpperCase()) {
            //the data is been found, give the located index
            return i;
        }
    }
    //did not found any
    return -1;
}

async function main() {

    productD = [{ id: "10", item: "safeguard" }, { id: "20", item: "coke" }, { id: "30", item: "pinoybread" }];
    bioD = [{ Name: "abner", email: "abner@1" }, { Name: "beri", email: "beri@1" }, { Name: "carl", email: "carl@1" }];
    transportD = [{ plate: 1010, vehicle: "honda" }, { plate: 2020, vehicle: "isuzu" }, { plate: 3030, vehicle: "nissan" }];

    //rIndex = fFind(await rl.question("input value to find: "), 1, productD.length, productD);

    rIndex = fFind(await rl.question("input value to find: "), 1, transportD.length, transportD);

    //rIndex = fFind(await rl.question("input value to find: "), 1, transportD.length, bioD);

    if (rIndex == null) {
        console.log("\nthe key u use is out of range.");
    } else if (rIndex == -1) {
        console.log("\ndid not found on the word");
    } else {
        console.log("\nthere a match string it is on ", transportD[rIndex]);
    }

    await rl.question("exit prog...");
    rl.close();
}

main();











