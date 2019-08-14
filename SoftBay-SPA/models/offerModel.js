const offerModel = function () {
  const createOffer = function (params) {
    let offer = {
      product: params.product,
      description: params.description,
      price: params.price,
      pictureUrl: params.pictureUrl,

    };
    console.log(offer);
    // if (helper.isValidInput(offer) && helper.isValidPictureUrl(offer.pictureUrl)) {//TODO not working properly
    return requester.post('offers', 'appdata', 'Kinvey', offer);
    // }
  };

  const getAllOffers = function () {

    return requester.get(`offers`, 'appdata', 'Kinvey');
  };

  const getOfferById = function (id) {
    return requester.get(`offers/${id}`, 'appdata', 'Kinvey');

  };

  const editOffer = function (params) {
    let offer = {
      product: params.product,
      description: params.description,
      price: params.price,
      pictureUrl: params.pictureUrl,

    };
    console.log(offer);
    //TODO Validation
    return requester.put(`offers/${params.id}`, 'appdata', 'Kinvey', offer);


  };

  const deleteOffer = function (id) {
    return requester.del(`offers/${id}`, 'appdata', 'Kinvey');
  };


  return {
    createOffer,
    getAllOffers,
    getOfferById,
    editOffer,
    deleteOffer
  }

}();