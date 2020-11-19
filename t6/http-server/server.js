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
                if (req.url === "/" || req.url === "/tasks") {
                    axios
                        .get(`${apiUrl}/tasks`)
                        .then((resp) => {
                            let tasks = resp.data;

                            let data = {
                                tasksToDo: tasks.filter((task) => task.done === "false"),
                                tasksDone: tasks.filter((task) => task.done === "true"),
                            };

                            res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
                            res.write(render.app(data));
                            res.end();
                        })
                        .catch(function () {
                            res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
                            res.write(render.error("Failed to load information about tasks!"));
                            res.end();
                        });
                } else if (/^\/tasks(\?.+)?$/.test(req.url)) {
                    let queryStr = req.url.substring(1);
                    axios
                        .get(`${apiUrl}/${queryStr}`)
                        .then((resp) => {
                            let tasks = resp.data;

                            let data = {
                                tasksToDo: tasks.filter((task) => task.done === "false"),
                                tasksDone: tasks.filter((task) => task.done === "true"),
                            };

                            res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
                            res.write(render.app(data));
                            res.end();
                        })
                        .catch(function () {
                            res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
                            res.write(render.error("Failed to load information about tasks!"));
                            res.end();
                        });
                } else if (req.url === "/categories") {
                    axios
                        .get(`${apiUrl}/tasks`)
                        .then((resp) => {
                            let tasks = resp.data;

                            let categories = [
                                ...new Set(
                                    tasks.map((task) => {
                                        return task.category;
                                    }),
                                ),
                            ];

                            res.writeHead(200, { "Content-Type": "text/json; charset=utf-8" });
                            res.write(JSON.stringify(categories));
                            res.end();
                        })
                        .catch(function () {
                            res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
                            res.write(render.error("Failed to load information about categories!"));
                            res.end();
                        });
                } else if (/\/tasks\/[0-9]+$/.test(req.url)) {
                    let taskId = req.url.split("/")[2];
                    axios
                        .get(`${apiUrl}/tasks/${taskId}`)
                        .then((resp) => {
                            res.writeHead(201, { "Content-Type": "application/json; charset=utf-8" });
                            res.write(JSON.stringify(resp.data));
                            res.end();
                        })
                        .catch(() => {
                            res.writeHead(400);
                            res.write("Error: Invalid request!");
                            res.end();
                        });
                } else {
                    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
                    res.write(render.page404());
                    res.end();
                }
                break;
            case "POST":
                if (req.url === "/tasks") {
                    parseRequestBody(req, (data) => {
                        data["creation-date"] = new Date().toLocaleDateString("pt-PT");
                        data["done"] = "false";

                        axios
                            .post(`${apiUrl}/tasks`, data)
                            .then((resp) => {
                                res.writeHead(201, { "Content-Type": "application/json; charset=utf-8" });
                                res.write(JSON.stringify(resp.data));
                                res.end();
                            })
                            .catch(function () {
                                res.writeHead(400);
                                res.write("Error: Invalid request!");
                                res.end();
                            });
                    });
                } else {
                    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
                    res.write(render.page404());
                    res.end();
                }
                break;
            case "PUT":
                if (/\/tasks\/[0-9]+$/.test(req.url)) {
                    let taskId = req.url.split("/")[2];

                    parseRequestBody(req, (data) => {
                        axios
                            .put(`${apiUrl}/tasks/${taskId}`, data)
                            .then((resp) => {
                                res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
                                res.write(JSON.stringify(resp.data));
                                res.end();
                            })
                            .catch(() => {
                                res.writeHead(400);
                                res.write("Error: Invalid request!");
                                res.end();
                            });
                    });
                } else {
                    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
                    res.write(render.page404());
                    res.end();
                }
                break;
            case "DELETE":
                if (/\/tasks\/[0-9]+$/.test(req.url)) {
                    let taskId = req.url.split("/")[2];

                    axios
                        .delete(`${apiUrl}/tasks/${taskId}`)
                        .then(() => {
                            res.writeHead(200);
                            res.end();
                        })
                        .catch(() => {
                            res.writeHead(400);
                            res.write("Error: Invalid request!");
                            res.end();
                        });
                } else {
                    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
                    res.write(render.page404());
                    res.end();
                }
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
