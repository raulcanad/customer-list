const { spawn } = require('child_process');

const scripts = [
    'sporUat.js',
    'sporProd.js',
    'dazuUat.js',
    'dazuProd.js',
    'taloUat.js',
    'taloProd.js',
    'tenBetUat.js',
    'tenBetProd.js'
];

scripts.forEach(script => {
    const childProcess = spawn('node', [script]);

    childProcess.stdout.on('data', (data) => {
        console.log(`${script} stdout: ${data}`);
    });

    childProcess.stderr.on('data', (data) => {
        console.error(`${script} stderr: ${data}`);
    });

    childProcess.on('close', (code) => {
        console.log(`${script} child process exited with code ${code}`);
    });
});
