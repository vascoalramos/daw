const express = require("express");
const path = require("path");
const router = express.Router();

/* GET file. */
router.get("/files/:fname", (req, res) => {
    const fname = req.params.fname;
    console.log(req.url);
    const filePath = path.resolve(`${__dirname}/../uploads/${fname}`);
    res.sendFile(filePath);
});

router.get("/files/:fname/download", (req, res) => {
    const fname = req.params.fname;
    const filePath = path.resolve(`${__dirname}/../uploads/${fname}`);
    res.download(filePath);
});

module.exports = router;
