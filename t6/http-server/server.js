const http = require("http");
const axios = require("axios");

const { isStaticFile, serveStaticFile } = require("./static");
const {} = require("./templates");
const { parseRequestBody, currentDateTime } = require("./utils");

const serverPort = 7000;

const apiUrl = "http://localhost:3000";

let server = http.createServer(function (req, res) {
    let now = currentDateTime();
    console.log(`[${now}]      ${req.method}  ${req.url}`);

    if (isStaticFile(req)) {
        serveStaticFile(req, res);
    } else {
        switch (req.method) {
            case "GET":
                res.writeHead(404, { "Content-Type": "text/html;charset=utf-8" });
                res.write("<p>" + req.method + " não suportado neste serviço.</p>");
                res.end();
                break;
            case "POST":
                res.writeHead(404, { "Content-Type": "text/html;charset=utf-8" });
                res.write("<p>" + req.method + " não suportado neste serviço.</p>");
                res.end();
                break;
            default:
                res.writeHead(404, { "Content-Type": "text/html;charset=utf-8" });
                res.write("<p>" + req.method + " não suportado neste serviço.</p>");
                res.end();
        }
    }
});

server.listen(serverPort);
console.log(`Listening on ${serverPort}...`);
