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

        let finalData = { tpcs: new Array(8).fill(0) };

        Object.keys(formData).forEach(function (key) {
            let entry = formData[key];

            if (entry.name === "git") {
                finalData[entry.name] = `https://github.com/${entry.value}`;
            } else if (/tpc/.test(entry.name)) {
                tpcNumber = entry.name.substring(3);
                finalData.tpcs[tpcNumber] = 1;
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
