const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    numero: String,
    nome: String,
    git: String,
    photo: String,
    tpc: [Number],
});

module.exports = mongoose.model("student", studentSchema);
