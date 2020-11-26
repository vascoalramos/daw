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

/* GET new student form page. */
router.get("/students/register", (req, res) => {
    res.render("new-student");
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

/* POST new student. */
router.post("/students", (req, res) => {
    let data = req.body;

    student
        .check(data.numero)
        .then((numberOfStudents) => {
            if (numberOfStudents === 0) {
                student
                    .insert(data)
                    .then(() => {
                        res.status(201).end();
                    })
                    .catch((err) => {
                        res.render("error", { error: err });
                    });
            } else {
                res.status(400).json({ error: `Student with number: ${data.numero} already exists!` });
            }
        })
        .catch((err) => {
            console.log(err);
            res.render("error", { error: err });
        });
});

/* DELETE student. */
router.delete("/students/:id", (req, res) => {
    let studentId = req.params.id;

    student
        .check(studentId)
        .then((numberOfStudents) => {
            if (numberOfStudents !== 0) {
                student
                    .delete(studentId)
                    .then(() => {
                        res.status(200).end();
                    })
                    .catch((err) => {
                        res.render("error", { error: err });
                    });
            } else {
                res.status(400).json({ error: `Student with number: ${studentId} does not exist!` });
            }
        })
        .catch((err) => {
            console.log(err);
            res.render("error", { error: err });
        });
});

module.exports = router;
