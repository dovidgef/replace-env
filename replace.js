/*
Utility for automatically replacing parts of strings delineated by %string%
replacing them with `string` environment variable if it exists.
 */
'use strict';

const readline = require('readline');
const fs = require('fs');
const { EOL } = require('os');

let filename;

if (process.argv.length === 3) {
    filename = process.argv[2];
    console.log("Filename:", filename);

    if (!fs.existsSync(filename)) {
        console.log("Error: file does not exists");
        process.exit(1);
    }

    const readInterface = readline.createInterface({
        input: fs.createReadStream(filename),
        output: fs.createWriteStream(filename + '-new'),
        terminal: false
    });

    readInterface.on('line', function(line) {
        console.log(line);
        if (line) {
            const regex = /%[a-zA-Z_][a-zA-Z0-9_]*%/g;
            let envArray = line.match(regex);
            if (envArray && envArray.length) {
                for (let e of envArray) {
                    let envValue = process.env[e.slice(1, -1)];
                    if (envValue) {
                        line = line.replace(e, envValue);
                    }
                }
            }
            this.output.write(`added ${line}${EOL}`);
        } else {
            this.output.write(EOL);
        }
    });

    readInterface.on('close', function (event) {
        // Rename updated version of file to original overwriting original
        fs.renameSync(filename + "-new", filename)
        console.log(`Succesfully updated ${filename}`);
    })

} else {
    console.log("Error: must receive single argument containing filename");
    console.log("Usage: 'replace.js <filename.txt>'");
}
