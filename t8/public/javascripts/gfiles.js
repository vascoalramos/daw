let showImage = (name, type) => {
    let file;
    if (type === "image/png" || type === "image/jpeg") {
        file = `<img src="/api/files/${name}" width="80%"/>`;
    } else {
        file = `<p>${name}, ${type}<p/>`;
    }

    let fileObj = `
        <div class="row m-3">
            <div class="col-6">
                ${file}
            </div>
            <div class="col-6 border">
                <div class="row m-2">
                    <p><b>Filename:</b> ${name}</p>
                    <p><b>File Type:</b> ${type}</p>
                </div>
            </div>
        </div>
    `;

    let download = $(`<div><a href="api/files/${name}/download">Download</a></div>`);

    $("#imageContent").empty();
    $("#imageContent").append(fileObj, download);
};

let addFileInput = () => {
    let fileInput = `
        <div class="my-3 p-4 border rounded">
            <div class="row mb-3">
                <label for="desc">Description:</label>
                <input class="form-control" type="text" name="desc" required="">
            </div>
            <div class="row mb-3">
                <div class="custom-file">
                    <label class="custom-file-label" for="file">Select file</label>
                    <input class="custom-file-input" type="file" name="file" required="">
                </div>
            </div>
        </div>
    `;
    $("#fileInputGroup").append(fileInput);
};
