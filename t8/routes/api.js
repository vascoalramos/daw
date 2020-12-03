const express = require("express");
const path = require("path");
const multer = require("multer");

const router = express.Router();

const controller = require("../controllers/file");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../uploads/"));
    },

    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

/* GET file. */
router.get("/files/:fname", (req, res) => {
    const fname = req.params.fname;
    console.log(req.url);
    const filePath = path.resolve(`${__dirname}/../uploads/${fname}`);
    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(err.status).jsonp(err);
        }
    });
});

/* GET file - download. */
router.get("/files/:fname/download", (req, res) => {
    const fname = req.params.fname;
    const filePath = path.resolve(`${__dirname}/../uploads/${fname}`);
    res.download(filePath, (err) => {
        if (err) {
            res.status(err.status).jsonp(err);
        }
    });
});

/* POST file. */
router.post("/files", upload.single("file"), (req, res) => {
    controller
        .insertOne(req)
        .then(() => {
            res.redirect("/");
        })
        .catch((error) => {
            res.status(500).jsonp(error);
        });
});

module.exports = router;
