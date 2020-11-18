exports.init = (title, callback) => {
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

                <!-- Custom CSS -->
                <link rel="stylesheet" href="public/css/mine.css">
                
                <!-- Bootstrap core CSS -->
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
                    integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
            </head>
            <body>
                <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
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
                    <div class="container" style="padding-top: 5em;">
                        ${callback()}
                    </div>
                </main>

                <footer class="container">
                    <hr>
                    <p class="float-right"><a href="#">Back to top</a></p>
                    <p>&copy; DAW 2020 - Developed by Vasco Ramos.</p>
                </footer>
            </body>

            <!-- jQuery core JS -->
            <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
                integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
                crossorigin="anonymous"></script>

            <!-- Bootstrap core JS -->
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js"
                integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx"
                crossorigin="anonymous"></script>

            <!-- Font Awesome core JS -->
            <script src="https://kit.fontawesome.com/1209018324.js" crossorigin="anonymous"></script>
        </html>
    `;
};

exports.page404 = () => {
    return this.init("404 - To Do App", () => {
        return `
            <h1 style="text-align: center">404 - Current request is not supported!</p>
        `;
    });
};
