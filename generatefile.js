//This Js Script generate files with around 100 MB size in tmp/data


const fs = require('fs');
const path = require('path');

const dataDir = 'tmp/data';
const numberOfFiles = 30;
const targetFileSizeMB = 100;

// Ensure the data directory exists
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

// Generate files with random text content
for (let i = 1; i <= numberOfFiles; i++) {
    const filePath = path.join(dataDir, `${i}.txt`);
    const totalFileSizeBytes = targetFileSizeMB * 1024 * 1024;
    const randomText = generateRandomText(totalFileSizeBytes);
    fs.writeFileSync(filePath, randomText);
}

console.log('Data files generated successfully.');

function generateRandomText(targetSizeBytes) {
    let currentSizeBytes = 0;
    let randomText = '';

    while (currentSizeBytes < targetSizeBytes) {
        const line = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        randomText += `${line}\n`;
        currentSizeBytes += Buffer.from(line + '\n').length;
    }

    return randomText;
}
