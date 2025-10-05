
// This script demonstrates how to read and parse a CSV file
// using Node.js's 'fs' (File System) module.

const fs = require('fs');
const path = require('path');
const inpPrompt = require('prompt-sync')();

// Define the file path to read.
// This assumes a 'users.csv' file exists in the same directory as this script.
const filePath = path.join(__dirname, 'users.csv');

//holds the main database
mainData = [];

//part of fs.readFile
function parseCsv(csvString) {//7
    // Split the string into lines (rows)
    const lines = csvString.trim().split('\n');

    // Get the headers from the first line and split by commas
    const headers = lines[0].split(',');

    // Process the remaining lines (data)
    const data = lines.slice(1).map(line => {//8
        const values = line.split(',');
        const obj = {};

        // Map header names to values for each object
        for (let i = 0; i < headers.length; i++) {//9
            obj[headers[i].trim()] = values[i].trim();
        }//9

        return obj;
    });//8

    return data;
}//7

//part of writeFile before coming write
function convertToCsv(arr) {//5
    if (arr.length === 0) { //7
        return '';
    } //7

    // Get the headers from the first object's keys
    const headers = Object.keys(arr[0]).join(',');

    // Map each object to a string of its values, then join with newlines
    const rows = arr.map(obj => Object.values(obj).join(',')).join('\n');

    // Combine the headers and the rows
    return `${headers}\n${rows}`;
}//5

//stand by then go writeFile
//const csvString = convertToCsv(data);

function writeFile(csvString) {//2

    // Use fs.writeFile to save the file
    // The asynchronous method is preferred to avoid blocking the main thread.
    fs.writeFile(filePath, csvString, 'utf8', (err) => {
        if (err) {
            console.error('An error occurred while writing the file:', err);
            return;
        }

        console.log('CSV file has been saved successfully!');
        console.log(`File location: ${filePath}`);
    });


}//2

function freadFile() {//2 

    //let parsedData;
    // Read the file asynchronously
    let subData;
    console.log("freadFile filePath", filePath);

    fs.readFile(filePath, 'utf8', (err, data) => {//3
        if (err) {//5
            console.error('An error occurred while reading the file:', err);
            return;
        }//5

        console.log("inside readFile");

        try {//4
            const parsedData = parseCsv(data);
            console.log('CSV file parsed successfully!');
            console.log(parsedData);
            subData = parsedData;
        } catch (parseError) {//4
            console.error('An error occurred while parsing the CSV:', parseError);
        }//4
    });//3

    //if it fails parsedData is null
    return subData;
}//2

function addNewRow(_id, _lenData) {//2
    mainData.push({ id: 0, name: "", email: "" });
    _lenData += 1;
    console.log("input mode: ");
    _id += 1;
    mainData.id = _id;
    mainData.name[_lenData] = inpPrompt("Name:");
    mainData.email[_lenData] = inpPrompt("Email:");

}//2




function main() {//2

    //i assume that there's no empty csvdata
    //test if data is not empty
    mainData = freadFile();

    console.log("mainData ", mainData);

    id = 0;
    if (mainData == null) console.log("The file is empty");

    lenData = mainData.length;
    id = mainData[mainData.length].id;
    exitMain = false;
    while (True) {//3
        console.log("\n\nMenu\na add new, d delete, q quit");
        ans = inpPrompt();
        switch (ans) {//4 
            case "a":
                //addnew

                addNewRow(id, lenData);
                //save it
                const csvString = convertToCsv(mainData);
                writeFile(csvString);
                break;
            case "d":
                //delete

                break;
            case "q":
                //leave the prog

                exitMain = True;
                break;
        }//4

        if (exitMain == True) break;
    }//3

}//2


main()