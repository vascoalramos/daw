$(document).ready(function () {
    $(".check-task-button").click(function () {
        $($(this).children()[0]).toggleClass("fa-square fa-check-square");
    });

    $("#due-date").datepicker({
        format: "mm/dd/yyyy",
        todayHighlight: true,
        autoclose: true,
    });

    $("#newTaskModal button[type=submit]").click((event) => {
        event.preventDefault();
        createNewTask();
    });
});

let createNewTask = () => {
    let formData = $("#new-task-form").serialize();

    $.ajax({
        type: "POST",
        data: formData,
        url: "/tasks",
        processData: false,
    })
        .done(() => {
            $("#new-task-form").trigger("reset");
            $("#newTaskModal").modal("toggle");
            location.reload();
        })
        .fail((response) => {
            console.log(response);
        });
};
