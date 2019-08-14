const causeModel = function () {
  const createCause = function (params) {//TODO validation
    let cause = {
      ...params,
      donors: [],
      collectedFunds: 0
    };

    return requester.post('causes', 'appdata', 'Kinvey', cause);

  };

  const getAllCauses = function () {
    return requester.get(`causes`, 'appdata', 'Kinvey');
  };

  const getMyCauses = function (user_id) {
    return requester.get(`causes?query={"_acl.creator":"${user_id}"}`, 'appdata', 'Kinvey');
  };

  const getCauseById = function (id) {
    return requester.get(`causes/${id}`, 'appdata', 'Kinvey');
  };

  const editCause = function (params, donation) {
    let currentCollectedFunds = Number(params.collectedFunds);
    let updatedCollectedFunds = currentCollectedFunds + donation;
    console.log(params);
    params.collectedFunds = updatedCollectedFunds;
    console.log(params.donors);
    let donor = params.donors.filter((name) => name === sessionStorage.getItem('username'))[0];

    console.log(donor);
    if (!donor) {
      params.donors.push(sessionStorage.getItem('username'));
    }
    let updatedCause = {
      ...params
    };

    return requester.put(`causes/${params._id}`, 'appdata', 'Kinvey', updatedCause);
  };

  const deleteCause = function (id) {//TODO Delete
    return requester.del(`causes/${id}`, 'appdata', 'Kinvey');
  };


  return {
    createCause,
    getAllCauses,
    getMyCauses,
    getCauseById,
    editCause,
    deleteCause
  }

}();