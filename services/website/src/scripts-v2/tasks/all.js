const path = require('path')
const childProcess = require('child_process');

const runScript = (scriptPath) => new Promise((resolve, reject) => {

    // keep track of whether callback has been invoked to prevent multiple invocations
    var invoked = false;

    var process = childProcess.fork(scriptPath);

    // listen for errors as they may prevent the exit event from firing
    process.on('error', function (err) {
        if (invoked) return;
        invoked = true;
        reject(err);
    });

    // execute the callback once the process has finished running
    process.on('exit', function (code) {
        if (invoked) return;
        invoked = true;
        var err = code === 0 ? null : new Error('exit code ' + code);
        if (err) {
            reject(err)
        } else {
            resolve(code)
        }
    });

})

const scripts = [
    './git.js',
    './tables.js',
    './pageObjects.js',
    './sitemap.js',
]

async function main() {

    for (const script of scripts) {
        console.log(`[${script}] start`)
        await runScript(path.join(__dirname, script))
        console.log(`[${script}] done`)
    }
}

main()