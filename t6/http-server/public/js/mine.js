$(document).ready(function () {
    getCategories();

    $(".check-task-button").click(function () {
        $($(this).children()[0]).toggleClass("fa-square fa-check-square");
    });

    let options = {
        format: "dd/mm/yyyy",
        todayHighlight: true,
        autoclose: true,
    };

    $("#due-date").datepicker(options);
    $("#edit-due-date").datepicker(options);

    $("#newTaskModal button[type=submit]").click((event) => {
        event.preventDefault();

        let formIsValid = validateTaskForm("new-task-form");
        if (formIsValid) {
            createNewTask();
        }
    });

    $(".edit-task-button").click((event) => {
        let taskElm = $($(event.currentTarget).parent()).parent();
        let taskId = $(taskElm).attr("task-id");

        $("#edit-task-form").attr("task-id", taskId);

        getTask(taskId, (data) => {
            Object.keys(data).map((key) => {
                $(`#edit-${key}`).val(data[key]);
            });
        });
    });

    $("#editTaskModal button[type=submit]").click((event) => {
        event.preventDefault();

        let formIsValid = validateTaskForm("edit-task-form");
        if (formIsValid) {
            editTask();
        }
    });

    $(".delete-task-button").click((event) => {
        let taskElm = $($(event.currentTarget).parent()).parent();
        let taskId = $(taskElm).attr("task-id");

        deleteTask(taskId);
    });

    $(".task .check-task-button").click((event) => {
        let taskElm = $(event.currentTarget).parent();
        let taskId = $(taskElm).attr("task-id");

        getTask(taskId, (data) => {
            toggleCheckTask(data, "true");
        });
    });

    $(".task-done .check-task-button").click((event) => {
        let taskElm = $(event.currentTarget).parent();
        let taskId = $(taskElm).attr("task-id");

        getTask(taskId, (data) => {
            toggleCheckTask(data, "false");
        });
    });
});

let getCategories = () => {
    $.ajax({
        type: "GET",
        url: "/categories",
    })
        .done((data) => {
            data.forEach((category) => {
                console.log(category);
                $(".dropdown-menu").append(`
                    <a class="dropdown-item" href="tasks?category=${category}">${category}</a>
                `);
            });
        })
        .fail((response) => {
            console.log(response);
        });
};

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

let getTask = (taskId, callback) => {
    $.ajax({
        type: "GET",
        url: `/tasks/${taskId}`,
    })
        .done((data) => {
            callback(data);
        })
        .fail((response) => {
            console.log(response);
        });
};

let deleteTask = (taskId) => {
    $.ajax({
        type: "DELETE",
        url: `/tasks/${taskId}`,
    })
        .done(() => {
            location.reload();
        })
        .fail((response) => {
            console.log(response);
        });
};

let editTask = () => {
    let taskId = $("#edit-task-form").attr("task-id");
    let formData = $("#edit-task-form").serialize();
    console.log(formData);

    $.ajax({
        type: "PUT",
        data: formData,
        url: `/tasks/${taskId}`,
        processData: false,
    })
        .done(() => {
            $("#editTaskModal").modal("toggle");
            location.reload();
        })
        .fail((response) => {
            console.log(response);
        });
};

let toggleCheckTask = (data, doneVal) => {
    data.done = doneVal;

    let formData = Object.keys(data)
        .map((key) => {
            return encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
        })
        .join("&");

    $.ajax({
        type: "PUT",
        data: formData,
        url: `/tasks/${data.id}`,
        processData: false,
    })
        .done(() => {
            location.reload();
        })
        .fail((response) => {
            console.log(response);
        });
};

let validateTaskForm = (formId, errorId) => {
    let retVal;

    if (formId === "new-task-form") {
        retVal = validateTitle("#title") & validateDueDate("#due-date") & validateCategory("#category");
    } else {
        retVal = validateTitle("#edit-title") & validateDueDate("#edit-due-date") & validateCategory("#edit-category");
    }

    return retVal;
};

let validateTitle = (id) => {
    let retVal = true;

    let title = $(id).val();

    if (title.length == "") {
        $(`${id}-error`).show();
        retVal = false;
    } else if (title.length < 3 || title.length > 30) {
        $(`${id}-error`).show();
        $(`${id}-error`).html("Title length must be between 3 and 30");
        retVal = false;
    } else {
        $(`${id}-error`).hide();
    }
    return retVal;
};

let validateDueDate = (id) => {
    let retVal = true;

    let dueDate = $(id).val();

    if (dueDate.length == "") {
        $(`${id}-error`).show();
        retVal = false;
    } else if (!moment(dueDate, "DD/MM/YYYY", true).isValid()) {
        $(`${id}-error`).show();
        $(`${id}-error`).html("Invalid date (format: dd/mm/yyyy)");
        retVal = false;
    } else {
        $(`${id}-error`).hide();
    }
    return retVal;
};

let validateCategory = (id) => {
    let retVal = true;

    let category = $(id).val();

    if (category.length == "") {
        $(`${id}-error`).show();
        retVal = false;
    } else if (category.length < 3 || category.length > 10) {
        $(`${id}-error`).show();
        $(`${id}-error`).html("Category length must be between 3 and 10");
        retVal = false;
    } else {
        $(`${id}-error`).hide();
    }
    return retVal;
};
