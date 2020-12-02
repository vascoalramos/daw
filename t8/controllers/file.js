const jsonfile = require("jsonfile");

const fileDB = "./db.json";

module.exports.list = () => {
    return jsonfile.readFileSync(fileDB);
};

module.exports.insertOne = (req) => {
    let files = jsonfile.readFileSync(fileDB);

    let fileObject = {
        date: new Date().toISOString().substr(0, 16),
        name: req.file.filename,
        size: req.file.size,
        mimetype: req.file.mimetype,
        desc: req.body.desc,
    };
    files.push(fileObject);

    jsonfile.writeFile(fileDB, files);
};
