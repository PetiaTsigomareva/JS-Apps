const offerController = function () {
  const getCreateOffer = function (context) {
    helper.addHeaderInfo(context);
    helper.loadPartials(context)
      .then(function () {
        this.partial('./views/offer/createOffer.hbs')
      })
  };

  const postCreateOffer = function (context) {
    let err = "The create offer is not valid";
    // if (offerModel.createOffer(context.params) !== undefined) {//TODO Validation no working properly
    offerModel.createOffer(context.params)
      .then(helper.handler)
      .then((data) => {
        console.log(data);
        context.redirect('#/dashboard')
      })
    // } else {
    //   console.log(err);
    //   context.redirect('#/createOffer')
    // }

  };

  const loadOffers = function (context) {
    helper.addHeaderInfo(context);
    offerModel.getAllOffers()
      .then(helper.handler)
      .then((data) => {
        context.offers = data;
        context.offers.forEach((offer) => {
          offer['isCreator'] = sessionStorage.getItem('userId') === offer._acl.creator;
        });
        helper.loadPartials(context, {'offerView': './views/offer/offerView.hbs'})

          .then(function () {
            this.partial('./views/offer/dashboard.hbs')
          })
      })

  };


  const getEditOffer = function (context) {
    helper.addHeaderInfo(context);
    offerModel.getOfferById(context.params.id)
      .then(helper.handler)
      .then((data) => {
        Object.keys(data).forEach(key => {
          context[key] = data[key]
        });
        helper.loadPartials(context)
          .then(function () {
            this.partial('./views/offer/editOffer.hbs')
          })
      })
  };

  const postEditOffer = function (context) {
    offerModel.editOffer(context.params)
      .then(helper.handler)
      .then((data) => {
        console.log(data);
        context.redirect('#/dashboard')
      })

  };

  const getDeleteOffer = function (context) {
    helper.addHeaderInfo(context);
    offerModel.getOfferById(context.params.id)
      .then(helper.handler)
      .then((data) => {
        Object.keys(data).forEach(key => {
          context[key] = data[key]
        });
        helper.loadPartials(context)
          .then(function () {
            this.partial('./views/offer/deleteOffer.hbs')
          })
      })
  };

  const postDeleteOffer = function (context) {
    offerModel.deleteOffer(context.params.id)
      .then(helper.handler)
      .then((data) => {
        console.log(data);
        context.redirect('#/dashboard')
      })
  };

  const getOfferDetails = function (context) {
    helper.addHeaderInfo(context);
    offerModel.getOfferById(context.params.id)
      .then(helper.handler)
      .then((data) => {
        Object.keys(data).forEach(key => {
          context[key] = data[key]

        });
        helper.loadPartials(context)
          .then(function () {
            this.partial('./views/offer/offerDetails.hbs')
          })
      })
  };




  return {
    getCreateOffer,
    postCreateOffer,
    loadOffers,
    getOfferDetails,
    getEditOffer,
    postEditOffer,
    getDeleteOffer,
    postDeleteOffer,
  }
}();