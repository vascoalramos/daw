const express = require("express");
const router = express.Router();

const controller = require("../controllers/file");

router.get("/", (req, res) => {
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
    res.render("gfiles", { view: "upload" });
});

module.exports = router;
