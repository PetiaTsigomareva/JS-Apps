const userController = function () {

  const getRegister = function (context) {

    context.loadPartials({
      header: "./views/common/header.hbs",
      footer: "./views/common/footer.hbs"
    }).then(function () {
      this.partial('./views/user/registerPage.hbs')
    })
  };

  const getLogin = function (context) {
    context.loadPartials({
      header: "./views/common/header.hbs",
      footer: "./views/common/footer.hbs"
    }).then(function () {
      this.partial('./views/user/loginPage.hbs')
    })
  };

  const postRegister = function (context) {
    userModel.register(context.params)
      .then(helper.handler)
      .then((data) => {
        storage.saveUser(data);
        //TODO notification
        //redirect to login page
        homeController.getHome(context);
      })
  };

  const postLogin = function (context) {
    userModel.login(context.params)
      .then(helper.handler)
      .then((data) => {
        storage.saveUser(data);
        //TODO notification
        //redirect to home page
        homeController.getHome(context);
      })
  };

  const logout = function (context) {

    userModel.logout()
      .then(helper.handler)
      .then(() => {
        storage.deleteUser();
        //TODO notification
        //redirect to home page
        homeController.getHome(context);
      });
  };

  const getProfile=function (context) {
    const loggedIn = storage.getData('userInfo') !== null;

    if (loggedIn) {
      const username = JSON.parse(storage.getData('userInfo')).username;
      context.loggedIn = loggedIn;
      context.username = username.toUpperCase();
    }
    context.loadPartials({
      header: "./views/common/header.hbs",
      footer: "./views/common/footer.hbs"
    }).then(function () {
      this.partial('./views/user/profile.hbs')
    })
  };

  return {
    getRegister,
    postRegister,
    getLogin,
    postLogin,
    logout,
    getProfile
  }
}();