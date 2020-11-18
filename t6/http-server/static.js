const fs = require("fs");

exports.isStaticFile = (request) => {
    return /\/w3.css$/.test(request.url) || /\/favicon.png$/.test(request.url) || /\/student.png$/.test(request.url);
};

exports.serveStaticFile = (req, res) => {
    var partes = req.url.split("/");
    var file = partes[partes.length - 1];
    fs.readFile(`public/${file}`, (erro, dados) => {
        if (erro) {
            console.log("Erro: ficheiro não encontrado " + erro);
            res.statusCode = 404;
            res.end();
        } else {
            res.end(dados);
        }
    });
};
