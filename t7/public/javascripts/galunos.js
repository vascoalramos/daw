let registerStudent = () => {
    if (document.getElementById("new-student-form").checkValidity() === false) {
        ["name", "number", "git"].forEach((el) => {
            if ($(`#${el}`).val() === "") {
                $(`#${el}-error`).show();
            } else {
                $(`#${el}-error`).hide();
            }
        });
    } else {
        let formData = $("#new-student-form").serializeArray();

        let finalData = { tpc: new Array(8).fill(0) };

        Object.keys(formData).forEach(function (key) {
            let entry = formData[key];

            if (entry.name === "git") {
                finalData[entry.name] = `https://github.com/${entry.value}`;
            } else if (/tpc/.test(entry.name)) {
                tpcNumber = entry.name.substring(3);
                finalData.tpc[tpcNumber] = 1;
            } else {
                finalData[entry.name] = entry.value;
            }
        });

        $.ajax({
            type: "POST",
            data: JSON.stringify(finalData),
            url: "/students",
            processData: false,
            contentType: "application/json",
        })
            .done(() => {
                $(`#general-error`).hide();
                window.location = "/students";
            })
            .fail((err) => {
                let errorMessage = err.responseJSON.error;
                $(`#general-error > .card-body > span`).html(errorMessage);
                $(`#general-error`).show();
            });
    }
};

let deleteStudent = (studentId) => {
    $.ajax({
        type: "DELETE",
        url: `/students/${studentId}`,
    })
        .done(() => {
            window.location = "/students";
        })
        .fail((err) => {
            console.log(err);
        });
};

let updateStudent = (id) => {
    if (document.getElementById("edit-student-form").checkValidity() === false) {
        ["name", "number", "git"].forEach((el) => {
            if ($(`#${el}`).val() === "") {
                $(`#${el}-error`).show();
            } else {
                $(`#${el}-error`).hide();
            }
        });
    } else {
        let formData = $("#edit-student-form").serializeArray();
        let finalData = { tpc: new Array(8).fill(0) };

        Object.keys(formData).forEach(function (key) {
            let entry = formData[key];

            if (entry.name === "git") {
                finalData[entry.name] = `https://github.com/${entry.value}`;
            } else if (/tpc/.test(entry.name)) {
                tpcNumber = entry.name.substring(3) - 1;
                finalData.tpc[tpcNumber] = 1;
            } else {
                finalData[entry.name] = entry.value;
            }
        });

        $.ajax({
            type: "PUT",
            data: JSON.stringify(finalData),
            url: `/students/${id}`,
            processData: false,
            contentType: "application/json",
        })
            .done(() => {
                $(`#general-error`).hide();
                // window.location = `/students/${id}`;
            })
            .fail((err) => {
                let errorMessage = err.responseJSON.error;
                $(`#general-error > .card-body > span`).html(errorMessage);
                $(`#general-error`).show();
            });
    }
};
