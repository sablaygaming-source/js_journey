// This script demonstrates how to save an array of objects as a CSV file
// using Node.js's 'fs' (File System) module.

const fs = require('fs');
const path = require('path');

const inpPrompt = require('prompt-sync')();


// Example data: an array of objects
const data = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com' }
];


console.log("\n\nProgram starts");
for (let i = 0; i < 3; i += 1) {//3
    //console.log("\ni ", i);

    data[i].id = inpPrompt("id: ");

    //data[i].id = name("id");


    data[i].name = inpPrompt("name: ");


    data[i].email = inpPrompt("email: ");

}//3


// Define the output file path and name
const filePath = path.join(__dirname, 'users.csv');

/**
 * Converts an array of objects to a CSV string.
 * @param {Array<Object>} arr The array to convert.
 * @returns {string} The CSV formatted string.
 */
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

const csvString = convertToCsv(data);

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

