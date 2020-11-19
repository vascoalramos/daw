$(document).ready(function () {
    $(".check-task-button").click(function () {
        $($(this).children()[0]).toggleClass("fa-square fa-check-square");
    });

    $(".new-task-button").click(function () {
        createTask();
    });
});

let createTask = () => {
    console.log("here");
};
