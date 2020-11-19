$(document).ready(function () {
    $(".check-task-button").click(function () {
        $($(this).children()[0]).toggleClass("fa-square fa-check-square");
    });

    $("#due-date").datepicker({
        format: "dd/mm/yyyy",
        todayHighlight: true,
        autoclose: true,
    });

    $("#newTaskModal button[type=submit]").click((event) => {
        event.preventDefault();

        let formIsValid = validateTaskForm();
        if (formIsValid) {
            createNewTask();
        }
    });

    $(".task .check-task-button").click((event) => {
        let taskElm = $(event.currentTarget).parent();
        let taskId = $(taskElm).attr("task-id");

        console.log(getTask(taskId));
    });

    $(".task-done .check-task-button").click((event) => {
        alert("here");
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
            $("#newTaskModal").modal("toggle");
            location.reload();
        })
        .fail((response) => {
            console.log(response);
        });
};

let getTask = (taskId) => {
    let data;

    $.ajax({
        type: "GET",
        url: `/tasks/${taskId}`,
    })
        .done((resp) => {
            data = resp.data;
            $("#newTaskModal").modal("toggle");
            location.reload();
        })
        .fail((response) => {
            console.log(response);
        });

    return data;
};

let validateTaskForm = () => {
    let retVal = validateTitle() & validateDueDate() & validateCategory();

    return retVal;
};

let validateTitle = () => {
    let retVal = true;

    let title = $("#title").val();

    if (title.length == "") {
        $("#title-error").show();
        retVal = false;
    } else if (title.length < 3 || title.length > 30) {
        $("#title-error").show();
        $("#title-error").html("Title length must be between 3 and 30");
        retVal = false;
    } else {
        $("#title-error").hide();
    }
    return retVal;
};

let validateDueDate = () => {
    let retVal = true;

    let dueDate = $("#due-date").val();

    if (dueDate.length == "") {
        $("#due-date-error").show();
        retVal = false;
    } else if (!moment(dueDate, "DD/MM/YYYY", true).isValid()) {
        $("#due-date-error").show();
        $("#due-date-error").html("Invalid date (format: dd/mm/yyyy)");
        retVal = false;
    } else {
        $("#due-date-error").hide();
    }
    return retVal;
};

let validateCategory = () => {
    let retVal = true;

    let category = $("#category").val();

    if (category.length == "") {
        $("#category-error").show();
        retVal = false;
    } else if (category.length < 3 || category.length > 10) {
        $("#category-error").show();
        $("#category-error").html("Category length must be between 3 and 10");
        retVal = false;
    } else {
        $("#category-error").hide();
    }
    return retVal;
};
