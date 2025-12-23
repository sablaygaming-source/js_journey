

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve static files from 'public' folder

// Database file path
const DB_FILE = path.join(__dirname, 'students_data.json');

/*  NOTE: IMPORTANT PART OF async and await usage
asyn function fFunc(){
    return 10; //note it will return promise if u didnt use await outside call of fFunct
}

.. outside call of fFunc

await fFunc() // will return not promise but its provided value, it is blocking operation
fFunc(); //will return promise because it is not blocking operating
*/

//BOOKMARK

function fGetData() {
    try {
        const data = fs.readFileSync(DB_FILE, 'utf8');

        console.log("\ndebug fGetData data ", data);
        //i did not use async function here because if i use async func
        //when fGetData is called it needs to use await keyword
        //if not await is used then fGetData return promise and it is {} empty object
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading database:', error);
        return [];
    }
}

function fSendData(data) {
    try {
        fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
        return true;
    } catch (error) {
        console.error('Error writing to database:', error);
        return false;
    }
}

// ==========================================
// THE "DATABASE" (In-memory array)
// ==========================================
let studentDatabase = [];
let nextIdCounter = 1; // A simple counter to generate unique IDs

// --- API Routes ---

// 1. GET Route: Send all students
app.get('/api/students', (req, res) => {
    console.log("-> Handling GET /api/students");
    // Send the current in-memory database
    res.json(studentDatabase);

});

// 2. POST Route 1: Refresh/Reload Database from CSV
app.post('/api/refreshBut', async function (req, res) {
    console.log("\n-> Handling POST /api/refreshBut");

    // Check if bRefresh is explicitly true in the request body
    if (req.body && req.body.bRefresh === true) {

        // **FIXED TYPO:** Using the correct global variable studentDatabase
        studentDatabase = fGetData();

        console.log("\nDebug studentDatabase ", studentDatabase);

        // **FIXED LOGIC:** Correctly determining the next ID
        if (studentDatabase.length > 0) {
            // Ensure we parse the 'id' field of the last student as an integer before incrementing
            const lastId = parseInt(studentDatabase[studentDatabase.length - 1].id, 10);
            nextIdCounter = lastId + 1;
        } else {
            nextIdCounter = 1; // Reset counter if the file was empty
        }

        // **MANDATORY:** Send a response back to the client
        return res.status(200).json({
            message: "Database refreshed.",
            count: studentDatabase.length,
            nextId: nextIdCounter
        });
    }

    // If the request body was invalid
    res.status(400).json({ message: "Invalid request. Expected {bRefresh: true}" });
});

// 3. POST Route 2: Create a new student
app.post('/api/students', async function (req, res) {
    console.log("\n-> Handling POST /api/students");

    const incomingData = req.body;

    const newStudent = {
        id: nextIdCounter++,
        date: new Date().toLocaleDateString('en-US'),
        fullName: incomingData.fullName,
        Address: incomingData.Address,
        course: incomingData.course,
        Email: incomingData.Email
    };

    // 1. Save to in-memory database
    studentDatabase.push(newStudent);
    console.log("New student added:", newStudent.fullName);

    // 2. Persist to CSV file asynchronously
    fSendData(studentDatabase);

    // 3. Send back a success response
    res.status(201).json({ message: "Success", student: newStudent });
});

// --- INFINITE LOOP LOGIC ---
// A variable to hold the string you want to send
let displayString = "INITIALIZING...";

// --- 1. INFINITE LOOP LOGIC ---
async function simulateDatabaseUpdates() {
    console.log("Background updater started...");

    while (true) {
        // Logic: Update the string with the current date/time
        //displayString = `Server Time: ${new Date().toLocaleTimeString()}`;
        const now = new Date();

        // Create a full date and time string
        const fullDateTime = now.toLocaleString('en-US', {
            //weekday: 'short', // Optional: Mon, Tue, etc.
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        displayString = `${fullDateTime}`;
        //console.log("Data updated in background: ", displayString);

        // Wait for 5 seconds
        await new Promise(resolve => setTimeout(resolve, 2000));
    }
}

function fMain(pPort) {//2

    console.log(`Server running at http://localhost:${pPort}`);
    /*
    // Load initial data when the server starts
    studentDatabase = fGetData();
    if (studentDatabase.length > 0) {
        const lastId = parseInt(studentDatabase[studentDatabase.length - 1].id, 10);
        nextIdCounter = lastId + 1;
    }
    console.log(`Database initialized with ${studentDatabase.length} records. Next ID: ${nextIdCounter}`);
    */

}//2

// --- 2. THE ROUTE (Defined ONCE outside the loop) ---
// Changed to .get to match your frontend fetch
app.get('/api/display', (req, res) => {
    console.log("-> Handling GET /api/display");
    res.json({
        message: "display date",
        date: displayString // Sends the string updated by the loop
    });
});


// Start the loop (it runs independently in the background)
simulateDatabaseUpdates();


// Initialize database file if it doesn't exist
if (!fs.existsSync(DB_FILE)) { //10
    fs.writeFileSync(DB_FILE, JSON.stringify([]));
}//10


// Start the server
app.listen(PORT, fMain(PORT));


//////
//user input
//Set up the terminal to listen for input
process.stdin.setEncoding('utf8');

process.stdin.on('data', (key) => {
    // .trim() removes any hidden newline characters (\n)
    const input = key.toString().trim().toLowerCase();

    if (input === 'q') {
        console.log('⚠️  Exiting server safely...');

        // Clean up resources before leaving
        process.exit(0);
    } else {
        console.log(`You typed: "${input}". Type "q" to stop the server.`);
    }
});

console.log('⌨️  Terminal Commands: Type "q" and press Enter to stop the server.');