let init = (title, callback) => {
    return `
        <!doctype html>
        <html lang="en">
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                <meta name="description" content="To-Do Web Application">
                <meta name="author" content="Vasco Ramos">
                <title>${title}</title>

                <link rel="icon" href="public/img/favicon.png"/>
                
                <!-- Bootstrap core CSS -->
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
                    integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
                
                <!-- Bootstrap Date-Picker CSS -->
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/css/bootstrap-datepicker3.css"/>

                <!-- Custom CSS -->
                <link rel="stylesheet" href="public/css/mine.css">
            </head>
            <body>
                <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-primary">
                    <a class="navbar-brand" href="#"><i class="far fa-check-square"></i> To Do</a>

                    <!-- Hamburger menu -->
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault"
                        aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarsExampleDefault">
                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item">
                                <a class="nav-link" href="#intro">Resumo</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#history">Breve História</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#trivia">Curiosidades</a>
                            </li>
                        </ul>
                    </div>
                </nav>

                <main role="main">
                    ${callback()}
                </main>

                <footer class="container">
                    <hr>
                    <p class="float-right"><a href="#">Back to top</a></p>
                    <p>&copy; DAW 2020 - Developed by Vasco Ramos.</p>
                </footer>
            </body>

            <!-- jQuery core JS -->
            <script src="https://code.jquery.com/jquery-3.5.1.min.js"
                integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
                crossorigin="anonymous"></script>

            <!-- Bootstrap core JS -->
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js"
                integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx"
                crossorigin="anonymous"></script>

            <!-- Font Awesome core JS -->
            <script src="https://kit.fontawesome.com/1209018324.js" crossorigin="anonymous"></script>

            <!-- Bootstrap Date-Picker JS -->
            <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/js/bootstrap-datepicker.min.js"></script>

            <!-- Moment.js Date validation JS -->
            <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js"></script>

            <!-- Custom JS -->
            <script src="public/js/mine.js"></script>
        </html>
    `;
};

exports.page404 = () => {
    return init("404 - To Do App", () => {
        return `
            <div class="container" style="padding-top: 5em;">
                <h1 style="text-align: center">404 - Current request is not supported!</h1>
            </div>
        `;
    });
};

exports.error = (errorMsg) => {
    return init("Error - To Do App", () => {
        return `
            <div class="container" style="padding-top: 5em;">
                <h2 style="text-align: center">Error: ${errorMsg}</h2>
            </div>
        `;
    });
};

exports.app = (data) => {
    return init("To Do App", () => {
        let html = `
            <div class="container-fluid" style="padding: 5em 10em 0 10em;">
                <div class="row">
                    <div class="board-card col-6">
                        <h3><b>To Do</b></h3>
                        <ul class="tasks-board">

        `;

        data.tasksToDo.forEach((task) => {
            html += `
                            <li class="task" task-id="${task.id}">
                                <span class="check-task-button"><i class="far fa-square"></i></span> 
                                <span class="task-description">${task.title}</span>
                                <span class="task-section-right">
                                    <span class="badge badge-pill badge-primary task-category">${task.category}</span>
                                    <span class="badge badge-pill badge-secondary task-due-date">${task["due-date"]}</span>
                                    <span class="edit-task-button"><i class="far fa-edit"></i></span>
                                    <span class="delete-task-button"><i class="far fa-trash-alt"></i></span>
                                </span>
                            </li>
            `;
        });

        html += `
                            <li class="new-task">
                                <span class="new-task-button" data-toggle="modal" data-target="#newTaskModal">
                                    <i class="fas fa-plus"></i> Add task
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div class="board-card col-6">
                        <h3><b>Done</b></h3>
                        <ul class="tasks-board">
        `;

        data.tasksDone.forEach((task) => {
            html += `
                            <li class="task-done" task-id="${task.id}">
                                <span class="check-task-button"><i class="far fa-square"></i></span>
                                <span class="task-description">${task.title}</span>
                                <span class="task-section-right">
                                    <span class="badge badge-pill badge-primary task-category">${task.category}</span>
                                    <span class="badge badge-pill badge-secondary task-due-date">${task["due-date"]}</span>
                                    <span class="edit-task-button"><i class="far fa-edit"></i></span>
                                    <span class="delete-task-button"><i class="far fa-trash-alt"></i></span>
                                </span>
                            </li>
            `;
        });

        html += `
                        </ul>
                    </div>
                </div>
            </div>


            <div class="modal fade" id="newTaskModal" tabindex="-1" aria-labelledby="newTaskModal" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-dialog-centered">
                    <div class="modal-content" style="border-radius: 0.7em;">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Create new Task</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form id="new-task-form">
                                <div class="form-group">
                                    <label for="title" hidden>Title</label>
                                    <input type="text" class="form-control" id="title" name="title" aria-describedby="titleHelp" placeholder="Title..." required/>
                                    <p id="title-error" style="color: red; display: none">Title is required.</p> 
                                </div>
                                <div class="form-group">
                                    <label for="description" hidden>Description</label>
                                    <textarea type="text" class="form-control" id="description" name="description" placeholder="Description..."></textarea>
                                </div>
                                <div class="form-group">
                                    <label for="due-date" hidden>Due date</label>
                                    <input type="text" class="form-control" id="due-date" name="due-date" placeholder="Select date" required/>
                                    <p id="due-date-error" style="color: red; display: none">Due date is required.</p> 
                                </div>
                                <div class="form-group">
                                    <label for="person" hidden>Person</label>
                                    <input type="text" class="form-control" id="person" name="person" aria-describedby="personHelp" placeholder="Your name..." required/>
                                </div>
                                <div class="form-group">
                                    <label for="category" hidden>Category</label>
                                    <input type="text" class="form-control" id="category" name="category" aria-describedby="categoryHelp" placeholder="Category..." required/>
                                    <p id="category-error" style="color: red; display: none">Category is required.</p> 
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary">Add task</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        return html;
    });
};
