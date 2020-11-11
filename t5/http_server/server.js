const http = require("http");
const axios = require("axios");

axios.defaults.baseURL = "http://localhost:3000";

const listStudents = (res) => {
	axios
		.get("/alunos")
		.then((resp) => {
			let alunos = resp.data;

			res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
			res.write("<h2>Escola de Música: Lista de Alunos</h2>");
			res.write("<ul>");

			alunos.forEach((aluno) => {
				res.write(`<li>${aluno.id} - ${aluno.nome}</li>`);
			});

			res.write("</ul>");
			res.write(`<address>[<a href="/">Voltar à Home</a>]</address>`);
			res.end();
		})
		.catch((err) => {
			console.log(`Èrro na obtenção da lista de alunos: ${err}`);
		});
};

const listCourses = (res) => {
	axios
		.get("/cursos")
		.then((resp) => {
			let cursos = resp.data;

			res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
			res.write("<h2>Escola de Música: Lista de Cursos</h2>");
			res.write("<ul>");

			cursos.forEach((curso) => {
				res.write(`<li>${curso.id} - ${curso.designacao}</li>`);
			});

			res.write("</ul>");
			res.write(`<address>[<a href="/">Voltar à Home</a>]</address>`);
			res.end();
		})
		.catch((err) => {
			console.log(`Èrro na obtenção da lista de alunos: ${err}`);
		});
};

const listInstruments = (res) => {
	axios
		.get("/instrumentos")
		.then((resp) => {
			let instrumentos = resp.data;

			res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
			res.write("<h2>Escola de Música: Lista de Instrumentos</h2>");
			res.write("<ul>");

			instrumentos.forEach((instr) => {
				res.write(`<li>${instr.id} - ${instr["#text"]}</li>`);
			});

			res.write("</ul>");
			res.write(`<address>[<a href="/">Voltar à Home</a>]</address>`);
			res.end();
		})
		.catch((err) => {
			console.log(`Èrro na obtenção da lista de alunos: ${err}`);
		});
};

http.createServer((req, res) => {
	console.log(`${req.method} ${req.url}`);

	if (req.method === "GET") {
		if (req.url === "/") {
			res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
			res.write("<h2>Escola de Música</h2>");
			res.write(`
                <ul>
                    <li><a href="/alunos">Lista de alunos</a></li>
                    <li><a href="/cursos">Lista de cursos</a></li>
                    <li><a href="/instrumentos">Lista de instrumentos</a></li>
                </ul>
            `);
			res.end();
		} else if (req.url === "/alunos") {
			listStudents(res);
		} else if (req.url === "/cursos") {
			listCourses(res);
		} else if (req.url === "/instrumentos") {
			listInstruments(res);
		} else {
			res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
			res.write(`<p>Pedido não suportado: ${req.method} ${req.url}</p>`);
			res.end();
		}
	} else {
		res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
		res.write(`<p>Pedido não suportado: ${req.method} ${req.url}</p>`);
		res.end();
	}
}).listen(4000);

console.log("Server listening at port 4000...");
