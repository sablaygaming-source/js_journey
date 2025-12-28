


async function fStandby() {

    for (let i = 0; i < 10; i += 1) {
        for (let j = 0; j < 1000000000; j += 1) {
            //busy
        }
        console.log('\nfStandBy i ${i}');

        await new Promise((resolve) => { setImmediate(resolve) });
    }

    console.log("\nEnd of fStandby");
}


async function fMain() {

    fStandby();

    for (let i = 0; i < 10; i += 1) {
        for (let j = 0; j < 1000000000; j += 1) {
            //busy
        }
        console.log('\nfMaini ${i}');
        await new Promise((resolve) => { setImmediate(resolve) });
    }
    console.log("\nEnd of fMain");
}


fMain();
console.log("\nEnd of prog...");