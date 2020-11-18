const fs = require("fs");

exports.isStaticFile = (request) => {
    console.log(/public\/(css|js|img)\/.$/.test(request.url));
    return /public\/(css|js|img)\/.+$/.test(request.url);
};

exports.serveStaticFile = (req, res) => {
    let urlPortions = req.url.split("/").slice(-2);
    let file = urlPortions.join("/");

    console.log(file);

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
