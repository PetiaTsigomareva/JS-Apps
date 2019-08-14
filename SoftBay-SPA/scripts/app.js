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
    this.get('#/profile', userController.getProfile);

    //Offer
    this.get('#/createOffer', offerController.getCreateOffer);
    this.get('#/dashboard', offerController.loadOffers);
    this.get('#/offerEdit/:id', offerController.getEditOffer);
    this.get('#/offerDelete/:id', offerController.getDeleteOffer);
    this.get('#/offerDetails/:id', offerController.getOfferDetails);
    this.post('#/createOffer', offerController.postCreateOffer);
    this.post('#/offerEdit/:id', offerController.postEditOffer);
    this.post('#/offerDelete/:id', offerController.postDeleteOffer);


  }).run('#/home');
};


