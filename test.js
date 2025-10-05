
//"user strict";

const inpStr = require('prompt-sync')();

try {
    let num = inpStr("input number: ");
    let vars = "im a string";
    num = parseInt(num, 10);

    if (vars === num) console.log("error input aa");
    else console.log("valid input aa num ", num, ", vars ", vars);

} catch (errs) {
    // This code is never reached for the error above.
    console.log("This will not catch the error!, the errs: ", errs);
}





















