#!/usr/bin/env node
/*
Command line utility for automatically injecting environment variables into files.
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

    // Create copy of file to use for attempted string replacement - Keep file permissions the same
    // Fail if file already exists
    fs.copyFileSync(filename, filename + '-new', fs.constants.COPYFILE_EXCL);

    const readInterface = readline.createInterface({
        input: fs.createReadStream(filename),
        output: fs.createWriteStream(filename + '-new'),
        terminal: false
    });

    readInterface.on('line', function(line) {
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
            this.output.write(`${line}${EOL}`);
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
    console.log("Usage: 'replace-env <filename.txt>'");
}
