const app = Sammy("#main", function () {

    this.use('Handlebars', 'hbs');

    // Home
    this.get('#/home', homeController.getHome);

    // User
    this.get('#/register', userController.getRegister);
    this.get('#/login', userController.getLogin);
    this.get('#/profile', userController.getProfile);

    this.post('#/register', userController.postRegister);
    this.post('#/login', userController.postLogin);
    this.get('#/logout', userController.logout);

    //Event
    this.get('#/createEvent',eventController.getCreateEvent);
    this.get('#/eventDetails/:id', eventController.getDetailsEvent);
    this.get('#/editEvent/:id',eventController.getEditEvent);
    this.get('#/deleteEvent/:id',eventController.postDeleteEvent);
    this.get('#/joinEvent/:id',eventController.getJoinEvent);
    this.post('#/createEvent',eventController.postCreateEvent);
    this.post('#/editEvent/:id',eventController.postEditEvent);
   // this.post('#/joinEvent/:id',eventController.postJoinEvent);

});

(() => {
    app.run('#/home');
})();