const { parse } = require("querystring");

// retrieves info from request body
exports.parseRequestBody = (request, callback) => {
    console.log(request.headers["content-type"]);
    if (request.headers["content-type"].split(";")[0] == "application/x-www-form-urlencoded") {
        let body = "";

        request.on("data", (blob) => {
            body += blob.toString();
        });

        request.on("end", () => {
            callback(parse(body));
        });
    }
};

exports.currentDateTime = () => {
    let dateString = new Date().toISOString();
    return `${dateString.substring(0, 10)} ${dateString.substring(11, 19)}`;
};
