const express = require('express');
const fs = require('fs');
const readline = require('readline');

const app = express();
const port = 8080;

app.get('/data', (req, res) => {
    const { n, m } = req.query;

    if (!n) {
        return res.status(400).send('Parameter n is required.');
    }

    const filePath = `tmp/data/${n}.txt`;

    if (m) {
        // Return content of file at line number m
        readSpecificLine(filePath, +m)
            .then((lineContent) => {
                res.send(lineContent);
            })
            .catch((error) => {
                console.error(error);
                res.status(500).send('Internal Server Error');
            });
    } else {
        // Return entire contents of the file
        readEntireFile(filePath)
            .then((fileContent) => {
                res.send(fileContent);
            })
            .catch((error) => {
                console.error(error);
                res.status(500).send('Internal Server Error');
            });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

function readEntireFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

function readSpecificLine(filePath, lineNumber) {
    return new Promise((resolve, reject) => {
        const rl = readline.createInterface({
            input: fs.createReadStream(filePath),
            crlfDelay: Infinity,
        });

        let currentLine = 1;

        rl.on('line', (line) => {
            if (currentLine === lineNumber) {
                rl.close();
                resolve(line);
            } else {
                currentLine++;
            }
        });

        rl.on('close', () => {
            console.log('File closed');
            if (currentLine < lineNumber) {
                reject(`Line number ${lineNumber} is out of bounds for file ${filePath}`);
            }
        });

        rl.on('error', (err) => {
            console.error('Error reading line:', err);
            reject(err);
        });
    });
}
