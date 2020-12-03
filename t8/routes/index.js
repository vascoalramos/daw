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
            res.render("error", { error: err });
        });
});

router.get("/files/upload", (req, res) => {
    res.render("gfiles", { view: "upload" });
});

module.exports = router;
