const Student = require("../models/student");

module.exports.list = () => {
    return Student.find().sort({ nome: 1 });
};

module.exports.fetch = (id) => {
    return Student.findOne({ numero: id });
};

module.exports.insert = (student) => {
    let newStudent = new Student(student);
    return newStudent.save();
};

module.exports.check = (id) => {
    return Student.countDocuments({ numero: id });
};

module.exports.delete = (id) => {
    return Student.deleteOne({ numero: id });
};
