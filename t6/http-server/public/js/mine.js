$(document).ready(function () {
    $(".check-task-button").click(function () {
        $($(this).children()[0]).toggleClass("fa-square fa-check-square");
    });
});
