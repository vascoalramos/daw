const jsonfile = require("jsonfile");

const fileDB = "./db.json";

module.exports.list = () => {
    return jsonfile.readFile(fileDB);
};

module.exports.insertOne = (file, body) => {
    let files = jsonfile.readFileSync(fileDB);

    let fileObject = {
        date: new Date().toISOString().substr(0, 16),
        name: file.filename,
        size: file.size,
        mimetype: file.mimetype,
        desc: body.desc,
    };
    files.push(fileObject);

    return jsonfile.writeFile(fileDB, files);
};

module.exports.insertMany = (fileArray, descArray) => {
    let files = jsonfile.readFileSync(fileDB);

    let desc, fileObject;

    fileArray.forEach((file, idx) => {
        desc = descArray[idx];

        fileObject = {
            date: new Date().toISOString().substr(0, 16),
            name: file.filename,
            size: file.size,
            mimetype: file.mimetype,
            desc: desc,
        };

        files.push(fileObject);
    });

    return jsonfile.writeFile(fileDB, files);
};
