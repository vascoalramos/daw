let registerStudent = () => {
    if (document.getElementById("new-student-form").checkValidity() === false) {
        ["name", "number"].forEach((el) => {
            if ($(`#${el}`).val() === "") {
                $(`#${el}-error`).show();
            } else {
                $(`#${el}-error`).hide();
            }
        });
    } else {
        let formData = new FormData($("#new-student-form")[0]);

        let tpcs = new Array(8).fill(0);

        formData.forEach((value, key) => {
            if (key === "git") {
                formData.set(key, `https://github.com/${value}`);
            } else if (/tpc/.test(key)) {
                tpcNumber = key.substring(3) - 1;
                tpcs[tpcNumber] = 1;
            }
        });

        for (let i = 1; i < 9; i++) {
            formData.delete(`tpc${i}`);
        }

        formData.append("tpc", JSON.stringify(tpcs));

        $.ajax({
            type: "POST",
            data: formData,
            url: "/students",
            processData: false,
            contentType: false,
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
        ["name", "number"].forEach((el) => {
            if ($(`#${el}`).val() === "") {
                $(`#${el}-error`).show();
            } else {
                $(`#${el}-error`).hide();
            }
        });
    } else {
        let formData = new FormData($("#edit-student-form")[0]);

        let tpcs = new Array(8).fill(0);

        formData.forEach((value, key) => {
            if (key === "git") {
                formData.set(key, `https://github.com/${value}`);
            } else if (/tpc/.test(key)) {
                tpcNumber = key.substring(3) - 1;
                tpcs[tpcNumber] = 1;
            }
        });

        for (let i = 1; i < 9; i++) {
            formData.delete(`tpc${i}`);
        }

        formData.append("tpc", JSON.stringify(tpcs));

        $.ajax({
            type: "PUT",
            data: formData,
            url: `/students/${id}`,
            processData: false,
            contentType: false,
        })
            .done(() => {
                $(`#general-error`).hide();
                window.location = `/students/${id}`;
            })
            .fail((err) => {
                let errorMessage = err.responseJSON.error;
                $(`#general-error > .card-body > span`).html(errorMessage);
                $(`#general-error`).show();
            });
    }
};
