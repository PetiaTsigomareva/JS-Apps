const homeController = function () {

  const getHome = async function (context) {

    helper.addHeaderInfo(context);
    helper.loadPartials(context)
      .then(function () {
        this.partial('./views/home/home.hbs')
      });
  };

  return {
    getHome
  }
}();