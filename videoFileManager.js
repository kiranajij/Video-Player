const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, 'public', 'videos');

if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

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

function videoData() {
    const vidData = { videos: videoFiles(), names: fileNames() };
    return vidData;
}

module.exports = { videoFiles, fileNames, dirPath, videoData };
