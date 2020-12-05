//importing required modules
const express = require('express');
const ejs = require('ejs');
const multer = require('multer');
const path = require('path');
const vFM = require('./videoFileManager');
const { videoData } = require('./videoFileManager');

//Initializing app
const app = express();

//setting view engine
app.set('view engine', 'ejs');

//setting folder for static files
app.use(express.static('public'));

//setting up storage engine
const storage = multer.diskStorage({
    destination: vFM.dirPath,
    filename: function (req, file, cb) {
        cb(
            null,
            path.parse(file.originalname).name +
                '-' +
                Date.now() +
                path.extname(file.originalname)
        );
    },
});

//Initializing upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 3000000000 },
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    },
}).single('myVideo');

//check file type
function checkFileType(file, cb) {
    //allowed extention
    const filetypes = /mp4|mkv|avi|wmv|3gp/;
    //check ext
    const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
    );
    //check mime
    //const mimetype = filetypes.test(file.mimetype);
    if (extname) {
        return cb(null, true);
    } else {
        cb('Error: Videos only');
    }
}

//setting up routes
app.get('/', (req, res) => {
    res.render('index', {
        data: vFM.videoData,
    });
});

app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.render('index', {
                msg: err,
                data: vFM.videoData,
            });
        } else {
            if (req.file == undefined) {
                res.render('index', {
                    msg: 'Error: No File Selected',
                    data: vFM.videoData,
                });
            } else {
                console.log(req.file);
                return res.redirect('/');
            }
        }
    });
});

//listen to port
const port = 4000;
app.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}/`);
});
