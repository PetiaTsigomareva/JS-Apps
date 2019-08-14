const causeController = function () {
  const getCreateCause = function (context) {
    helper.addHeaderInfo(context);
    helper.loadPartials(context)
      .then(function () {
        this.partial('./views/cause/cause-create.hbs')
      })
  };

  const postCreateCause = function (context) {
    causeModel.createCause(context.params)
      .then(helper.handler)
      .then((data) => {
        console.log(data);
        context.redirect('#/cause/dashboard')
      })
  };

  const loadCauses = function (context) {
    helper.addHeaderInfo(context);
    causeModel.getAllCauses()
    //  causeModel.getMyCauses(sessionStorage.getItem('userId'))
      .then(helper.handler)
      .then((data) => {
        context.causes = data;
        helper.loadPartials(context, {'cause-view': './views/cause/cause-view.hbs'})
          .then(function () {
            this.partial('./views/cause/dashboard.hbs')
          })
      })
  };

  const getCauseDetails = function (context) {
    helper.addHeaderInfo(context);
    causeModel.getCauseById(context.params.id)
      .then(helper.handler)
      .then((data) => {
        Object.keys(data).forEach(key => {
          if (key === 'donors') {
            data[key] = data[key].join(' ');
          }
          context[key] = data[key]

        });
        context.isCreator = sessionStorage.getItem('userId') === context._acl.creator;
        helper.loadPartials(context)
          .then(function () {
            this.partial('./views/cause/cause-details.hbs')
          })
      })
  };


  const postEditCause = function (context) {
    let causeDonation = Number(context.params.currentDonation);
    let causeId = context.params.id;
    helper.addHeaderInfo(context);
    causeModel.getCauseById(causeId)
      .then(helper.handler)
      .then((data) => {
        console.log("Post Edit - " + data);
        causeModel.editCause(data, causeDonation)
          .then(helper.handler)
          .then((data) => {
            console.log(data);
            context.redirect('#/cause/dashboard')
          })
      });


  };


  const getDeleteCause = function (context) {
    helper.addHeaderInfo(context);
    causeModel.getCauseById(context.params.id)
      .then(helper.handler)
      .then((data) => {
        Object.keys(data).forEach(key => {
          context[key] = data[key]
        });
        helper.loadPartials(context)
          .then(function () {
            this.partial('./views/cause/cause-close.hbs')
          })
      })
  };

  const postDeleteCause = function (context) {
    causeModel.deleteCause(context.params.id)
      .then(helper.handler)
      .then((data) => {
        console.log(data);
        context.redirect('#/cause/dashboard')
      })
  };


  return {
    getCreateCause,
    postCreateCause,
    loadCauses,
    getCauseDetails,
    postEditCause,
    getDeleteCause,
    postDeleteCause

  }

}();