const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, 'public', 'videos');

function videoFiles() {
    const files = fs.readdirSync(dirPath);
    files.forEach((item, index, arr) => {
        arr[index] = path.join('videos', item);
    });
    return files;
}

function fileNames() {
    const files = fs.readdirSync(dirPath);
    files.forEach((item, index, arr) => {
        arr[index] = path.parse(item).name;
    });
    return files;
}

module.exports = { videoFiles, fileNames, dirPath };
