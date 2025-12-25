/**
 * EXPLANATION:
 * In your original code, the 'for' loop is "synchronous" and "blocking".
 * Node.js cannot pause a 'for' loop to run a setInterval callback.
 * * This version uses a recursive function with setImmediate to allow 
 * the Event Loop to breathe between iterations.
 */

function fTest() {
    console.log("\n>>> fTest TICK (Timer fired!) <<<");
}

async function fMain() {
    // Start the interval
    const intervalId = setInterval(fTest, 500); // Shorter time to see it clearly

    console.log("fMain: Starting work...");

    // We replace the blocking 'for' loop with a recursive process
    // that yields control back to Node.js after every iteration.
    for (let i = 0; i < 10; i++) {

        // This is the "Heavy Work" simulated
        for (let j = 0; j < 1000000000; j++) {
            // Busy wait
        }

        console.log(`fMain count i is ${i}`);

        // THE MAGIC BIT:
        // We "yield" to the event loop. This gives setInterval a chance to 
        // jump in and run fTest before we start the next 'i' iteration.
        await new Promise(resolve => setImmediate(resolve));
    }

    console.log("\nend of fMain");
    clearInterval(intervalId); // Stop the timer when done
}

// Execution
fMain().then(() => {
    console.log("\nend of prog...");
});

