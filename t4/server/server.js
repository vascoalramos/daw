const http = require("http");
const fs = require("fs");

const aux = require("./myModule");

// TODO: pensar em edge situations que possam estoirar o servidor
// TODO: limpar o código

http.createServer((req, res) => {
	console.log(`${req.method} ${req.url} ${aux.myDateTime()}`);

	if (req.url.match(/\/arqs\/arq[0-9]*$/)) {
		let num = req.url.slice(9);

		fs.readFile(`../site/arq${num}.html`, (err, data) => {
			if (err) {
				res.writeHead(404);
				res.end();
				return;
			}

			res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
			res.write(data);
			res.end();
		});
	} else if (req.url.match(/^\/static\//)) {
		let resource = req.url.slice(8);

		fs.readFile(`../site/static/${resource}`, (err, data) => {
			if (err) {
				res.writeHead(404);
				res.end();
				return;
			}

			res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
			res.write(data);
			res.end();
		});
	} else {
		res.writeHead(404);
		res.end();
		return;
	}
}).listen(7777);

console.log("Server listening at port 7777...");
