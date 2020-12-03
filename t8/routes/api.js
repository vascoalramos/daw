const express = require("express");
const path = require("path");
const multer = require("multer");

const router = express.Router();

const controller = require("../controllers/file");
const { PassThrough } = require("stream");

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
router.post("/files", upload.array("file"), (req, res) => {
    let nOfFiles = req.files.length;
    let nOfDescriptions = req.body.desc.length;

    if (Array.isArray(nOfDescriptions) && nOfFiles !== nOfDescriptions) {
        return res.status(400).jsonp({ message: "Number of files must be equal to number of descriptions" });
    }

    if (nOfFiles === 0) {
        res.status(400).jsonp({ message: "Must, at least, be sent 1 file and 1 description!" });
    } else if (nOfFiles === 1) {
        controller
            .insertOne(req.files[0], req.body)
            .then(() => {
                res.redirect("/");
            })
            .catch((error) => {
                res.status(500).jsonp(error);
            });
    } else {
        controller
            .insertMany(req.files, req.body.desc)
            .then(() => {
                res.redirect("/");
            })
            .catch((error) => {
                res.status(500).jsonp(error);
            });
    }
});

module.exports = router;
