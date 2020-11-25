const { model } = require("../galunos/models/student");
const Student = require("../galunos/models/student");

module.exports.list = () => {
    return Student.find().sort({ nome: 1 }).exec();
};

module.exports.fetch = (id) => {
    return Student.findOne({ numero: id }).exec();
};
module.exports.insert = (student) => {
    let newStudent = new Student(student);
    return newStudent.save();
};
