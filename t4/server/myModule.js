exports.myDateTime = () => {
	let d = new Date();
	return d.toISOString().substring(0, 19);
};

exports.turma = "DAW 2020";
