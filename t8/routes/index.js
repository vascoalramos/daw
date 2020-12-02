const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();

const controller = require("../controllers/file");
const templates = require("../routes/html-templates");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../uploads/"));
    },

    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

router.get("/", (req, res) => {
    let d = new Date().toISOString().substr(0, 16);
    controller
        .list()
        .then((data) => {
            res.render("gfiles", { list: data, view: "files_list" });
        })
        .catch((error) => {
            res.status(500).jsonp(error);
        });
});

router.get("/files/upload", (req, res) => {
    let d = new Date().toISOString().substr(0, 16);
    res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
    res.write(templates.fileForm(d));
    res.end();
});

router.post("/files", upload.single("myFile"), (req, res) => {
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
