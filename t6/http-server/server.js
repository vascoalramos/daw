const http = require("http");
const axios = require("axios");

const { isStaticFile, serveStaticFile } = require("./static");
const render = require("./templates");
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
                if (req.url == "/" || req.url == "/tasks") {
                    axios
                        .get(`${apiUrl}/tasks`)
                        .then((response) => {
                            let tasks = response.data;
                            console.log(tasks);

                            res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
                            res.write(render.page404());
                            res.end();
                        })
                        .catch(function () {
                            res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
                            res.write(render.error("Failed to load information about tasks!"));
                            res.end();
                        });
                } else {
                    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
                    res.write(render.page404());
                    res.end();
                }
                break;
            case "POST":
                res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
                res.write(render.page404());
                res.end();
                break;
            case "PUT":
                res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
                res.write(render.page404());
                res.end();
                break;
            case "DELETE":
                res.writeHead(404, { "Content-Type": "text/html;charset=utf-8" });
                res.write(render.page404());
                res.end();
                break;
            default:
                res.writeHead(404, { "Content-Type": "text/html;charset=utf-8" });
                res.write(render.page404());
                res.end();
        }
    }
});

server.listen(serverPort);
console.log(`Listening on ${serverPort}...`);
