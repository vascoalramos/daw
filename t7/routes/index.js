const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const student = require("../controllers/student");
const utils = require("../utils");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public/images/uploads/"));
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    },
});

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

/* GET update student form page. */
router.get("/students/:id/edit", (req, res) => {
    let studentId = req.params.id;
    student
        .fetch(studentId)
        .then((data) => {
            res.render("edit-student", { student: data });
        })
        .catch((err) => {
            res.render("error", { error: err });
        });
});

/* POST new student. */
router.post("/students", (req, res) => {
    let upload = multer({ storage: storage, fileFilter: utils.imageFilter }).single("photo");

    upload(req, res, (err) => {
        if (req.fileValidationError) {
            res.render("error", { error: err });
        } else if (err instanceof multer.MulterError) {
            res.render("error", { error: err });
        } else if (err) {
            res.render("error", { error: err });
        }

        let data = req.body;

        if (req.file) {
            data.photo = req.file.filename;
        }

        data.tpc = JSON.parse(data.tpc);

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

/* PUT edit student. */
router.put("/students/:id", (req, res) => {
    let studentId = req.params.id;
    let upload = multer({ storage: storage, fileFilter: utils.imageFilter }).single("photo");

    upload(req, res, (err) => {
        if (req.fileValidationError) {
            res.render("error", { error: err });
        } else if (err instanceof multer.MulterError) {
            res.render("error", { error: err });
        } else if (err) {
            res.render("error", { error: err });
        }

        let data = req.body;

        if (req.file) {
            data.photo = req.file.filename;
        }

        data.tpc = JSON.parse(data.tpc);

        student
            .check(studentId)
            .then((numberOfStudents) => {
                if (numberOfStudents !== 0) {
                    student
                        .update(studentId, data)
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
});

module.exports = router;
