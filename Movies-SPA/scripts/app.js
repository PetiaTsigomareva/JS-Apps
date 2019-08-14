window.onload = () => {
  Sammy("#container", function () {

    this.use('Handlebars', 'hbs');

    // Home
    this.get('#/home', homeController.getHome);

    // User
    this.get('#/register', userController.getRegister);
    this.get('#/login', userController.getLogin);

    this.post('#/register', userController.postRegister);
    this.post('#/login', userController.postLogin);
    this.get('#/logout', userController.logout);

    //Movie
    this.get('#/createMovie', movieController.getCreateMovie);
    this.get('#/allMovies', movieController.loadMovies);
    this.get('#/myMovies',movieController.loadMyMovies);
    this.get('#/editMovie/:id',movieController.getEditMovie);
    this.get('#/deleteMovie/:id',movieController.getDeleteMovie);
    this.get('#/detailsMovie/:id',movieController.getMovieDetails);
    this.get('#/buyTicket/:id',movieController.buyTickets);
    this.post('#/createMovie', movieController.postCreateMovie);
    this.post('#/editMovie/:id', movieController.postEditMovie);
    this.post('#/deleteMovie/:id',movieController.postDeleteMovie);



  }).run('#/home');
}


