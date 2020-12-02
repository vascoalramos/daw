let showImage = (name, type) => {
    let file;
    if (type === "image/png" || type === "image/jpeg") {
        file = `<img src="/api/files/${name}" width="80%"/>`;
    } else {
        file = `<p>${name}, ${type}<p/>`;
    }

    let fileObj = `
        <div class="w3-row w3-margin">
            <div class="w3-col s6">
                ${file}
            </div>
            <div class="w3-col s6 w3-border">
                <div class="w3-row w3-margin">
                    <p>Filename: ${name}</p>
                    <p>File Type: ${type}</p>
                </div>
            </div>
        </div>
    `;

    let download = $(`<div><a href="api/files/${name}/download">Download</a></div>`);

    $("#display").empty();
    $("#display").append(fileObj, download);
    $("#display").modal();
};
