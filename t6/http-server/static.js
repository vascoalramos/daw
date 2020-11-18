const fs = require("fs");

exports.isStaticFile = (request) => {
    return /\/w3.css$/.test(request.url) || /\/favicon.png$/.test(request.url) || /\/student.png$/.test(request.url);
};

exports.serveStaticFile = (req, res) => {
    let urlPortions = req.url.split("/");
    let file = urlPortions[urlPortions.length - 1];

    fs.readFile(`public/${file}`, (err, data) => {
        if (err) {
            console.log(`Error: file not found ${err}`);
            res.statusCode = 404;
            res.end();
        } else {
            res.end(data);
        }
    });
};
