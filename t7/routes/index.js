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
router.get("/students/:id", (req, res) => {
    let studentId = req.params.id;
    student
        .fetch(studentId)
        .then((data) => {
            res.render("student-detail", { student: data });
        })
        .catch((err) => {
            res.render("error", { error: err });
        });
});

/* GET new student form page. */
router.get("/students/register", (req, res) => {
    res.render("new-student");
});

module.exports = router;
