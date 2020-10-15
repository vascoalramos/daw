$(document).ready(function () {
	$(".myTab").on("click", function () {
		let elm = $($(this).children()[0]);
		elm.toggleClass("fa-caret-right").toggleClass("fa-caret-down");
	});
});
