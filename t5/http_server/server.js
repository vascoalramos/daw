const http = require("http");
const axios = require("axios");

axios.defaults.baseURL = "http://localhost:3000";

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
		} else if (req.url.match(/\/alunos\/\w+/)) {
			const studentId = req.url.slice(8);
			getStudentInfo(res, studentId);
		} else if (req.url.match(/\/cursos\/\w+/)) {
			const courseId = req.url.slice(8);
			getCourseInfo(res, courseId);
		} else {
			requestNotSupported(req, res);
		}
	} else {
		requestNotSupported(req, res);
	}
}).listen(4000);

console.log("Server listening at port 4000...");

const listStudents = (res) => {
	axios
		.get("/alunos")
		.then((resp) => {
			let students = resp.data;

			res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
			res.write("<h2>Escola de Música: Lista de Alunos</h2>");
			res.write("<ul>");

			students.forEach((s) => {
				res.write(`<li><a href="/alunos/${s.id}">${s.id} - ${s.nome}</a></li>`);
			});

			res.write("</ul>");
			res.write(`<address>[<a href="/">Voltar à Home</a>]</address>`);
			res.end();
		})
		.catch((err) => {
			console.log(`Erro na obtenção da lista de alunos: ${err}`);
		});
};

const listCourses = (res) => {
	axios
		.get("/cursos")
		.then((resp) => {
			let courses = resp.data;

			res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
			res.write("<h2>Escola de Música: Lista de Cursos</h2>");
			res.write("<ul>");

			courses.forEach((c) => {
				res.write(`<li><a href="cursos/${c.id}">${c.id} - ${c.designacao}<a></li>`);
			});

			res.write("</ul>");
			res.write(`<address>[<a href="/">Voltar à Home</a>]</address>`);
			res.end();
		})
		.catch((err) => {
			console.log(`Erro na obtenção da lista de cursos: ${err}`);
		});
};

const listInstruments = (res) => {
	axios
		.get("/instrumentos")
		.then((resp) => {
			let instruments = resp.data;

			res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
			res.write("<h2>Escola de Música: Lista de Instrumentos</h2>");
			res.write("<ul>");

			instruments.forEach((i) => {
				res.write(`<li>${i.id} - ${i["#text"]}</li>`);
			});

			res.write("</ul>");
			res.write(`<address>[<a href="/">Voltar à Home</a>]</address>`);
			res.end();
		})
		.catch((err) => {
			console.log(`Erro na obtenção da lista de instrumentos: ${err}`);
		});
};

const getStudentInfo = (res, studentId) => {
	axios
		.get(`/alunos/${studentId}`)
		.then((resp) => {
			let student = resp.data;

			res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
			res.write(`<h2>Escola de Música: Aluno ${student.id}</h2>`);

			res.write(`<p><b>ID: </b>${student.id}<p>`);
			res.write(`<p><b>NOME: </b>${student.nome}<p>`);
			res.write(`<p><b>NASCIMENTO: </b>${student.dataNasc}<p>`);
			res.write(`<p><b>CURSO: </b>${student.curso}<p>`);
			res.write(`<p><b>ANO DO CURSO: </b>${student.anoCurso}<p>`);
			res.write(`<p><b>INSTRUMENTO: </b>${student.instrumento}<p>`);

			res.write(`<address>[<a href="/">Voltar à Home</a>]</address>`);
			res.end();
		})
		.catch((err) => {
			console.log(`Erro na obtenção do aluno: ${err}`);
		});
};

const getCourseInfo = (res, courseId) => {
	axios
		.get(`/cursos/${courseId}`)
		.then((resp) => {
			let course = resp.data;

			res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
			res.write(`<h2>Escola de Música: Aluno ${course.id}</h2>`);

			res.write(`<p><b>ID: </b>${course.id}<p>`);
			res.write(`<p><b>DESIGNAÇÃO: </b>${course.designacao}<p>`);
			res.write(`<p><b>DURAÇÂO: </b>${course.duracao} anos<p>`);
			res.write(
				`<p><b>INSTRUMENTO: </b><a href="instrumentos/${course.instrumento.id}">${course.instrumento["#text"]}</a><p>`,
			);

			res.write(`<address>[<a href="/">Voltar à Home</a>]</address>`);
			res.end();
		})
		.catch((err) => {
			console.log(`Erro na obtenção do curso: ${err}`);
		});
};

const requestNotSupported = (req, res) => {
	res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
	res.write(`<p>Pedido não suportado: ${req.method} ${req.url}</p>`);
	res.end();
};
