window.onload = () => {
  Sammy("body", function () {

    this.use('Handlebars', 'hbs');

    // Home
    this.get('#/home', homeController.getHome);

    // User
    this.get('#/register', userController.getRegister);
    this.get('#/login', userController.getLogin);

    this.post('#/register', userController.postRegister);
    this.post('#/login', userController.postLogin);
    this.get('#/logout', userController.logout);

    //Cause
    this.get('#/cause/create', causeController.getCreateCause);
    this.post('#/cause/create', causeController.postCreateCause);
    this.get('#/cause/dashboard', causeController.loadCauses);
    this.get('#/cause/details/:id', causeController.getCauseDetails);
    this.post('#/cause/details/:id', causeController.postEditCause);
    this.get('#/cause/delete/:id', causeController.getDeleteCause);
    this.post('#/cause/delete/:id', causeController.postDeleteCause);


  }).run('#/home');
}


