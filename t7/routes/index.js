const express = require("express");
const router = express.Router();

const student = require("../controllers/student");

/* GET home page. */
router.get("/", (req, res) => {
    res.render("index", { title: "Express" });
});

/* GET students page. */
router.get("/students", (req, res) => {
    student
        .list()
        .then((data) => {
            res.render("students", { list: data });
        })
        .catch((err) => {
            res.render("error", { error: err });
        });
});

/* GET student page. */
router.get("/student/:id", (req, res) => {
    console.log(req.params);
    student
        .list()
        .then((data) => {
            res.render("students", { list: data });
        })
        .catch((err) => {
            res.render("error", { error: err });
        });
});

module.exports = router;
