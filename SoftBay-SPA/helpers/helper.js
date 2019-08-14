const helper = function () {

  const handler = function (response, context) {

    if (response.status >= 400) {
      throw new Error(`Something went wrong. Error: ${response.statusText}`);
      //TODO context.redirect('./views/error/error.hbs')
    }

    if (response.status !== 204) {
      response = response.json();
    }

    return response;
  };

  const passwordCheck = function (params) {
    return params.password === params.rePassword;
  };

  const addHeaderInfo = function (context) {
    const loggedIn = sessionStorage.getItem('authtoken') !== null;

    if (loggedIn) {
      context.loggedIn = loggedIn;
      context.username = sessionStorage.getItem('username');
    }
  };

  const loadPartials = function (context, externalPartials) {
    let defaultPartials = {
      header: "./views/common/header.hbs",
      footer: "./views/common/footer.hbs"
    };

    if (externalPartials) {
      for (const key in externalPartials) {
        const element = externalPartials[key];

        defaultPartials[key] = element;
      }
    }

    return context.loadPartials(defaultPartials);
  };

  const isValidInput = function (obj) {
    let result = true;
    for (let val of Object.values(obj)) {
      if (val === '') {
        result = false;
        break;
      }
    }
    return result;
  };

  const isValidPictureUrl = function (url) {
    let result = false;
    if (url.endsWith('.jpg') || url.endsWith('.png')) {
      result = true;
    }
    return result;
  };

  return {
    handler,
    passwordCheck,
    addHeaderInfo,
    loadPartials,
    isValidInput,
    isValidPictureUrl
  }
}();