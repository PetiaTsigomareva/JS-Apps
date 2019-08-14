const eventModel = function () {
  const createEvent = function (params) {
    let data = {
      ...params,
      peopleInterestedIn: 0,
      organizer: JSON.parse(storage.getData('userInfo')).username
    };

    let url = `/appdata/${storage.appKey}/events`;
    let headers = {
      body: JSON.stringify(data),
      headers: {}
    };
    return requester.post(url, headers);

  };
  const getAllEvents = function () {
    let url = `/appdata/${storage.appKey}/events`;
    let headers = {
      headers: {}
    };
    return requester.get(url, headers);
  };

  const getEventById = function (id) {
    let url = `/appdata/${storage.appKey}/events/${id}`;
    let headers = {
      headers: {}
    };
    return requester.get(url, headers);
  };

  const editEvent = function (params) {
    let url = `/appdata/${storage.appKey}/events/${params.id}`;
    delete params.id;
    let headers = {
      body: JSON.stringify(params),
      headers: {}
    };
    return requester.put(url, headers);
  };

  const deleteEvent = function (id) {
    let url = `/appdata/${storage.appKey}/events/${id}`;

    let headers = {
      headers: {}
    };
    return requester.del(url, headers);
  };

  const joinEvent = function (params) {
    console.log(params);
    let url = `/appdata/${storage.appKey}/events/${params._id}`;
   // delete params._id;
   params.peopleInterestedIn=+params.peopleInterestedIn+1;
    let headers = {
      body:JSON.stringify(params),
      headers: {}
    };
   return requester.put(url, headers);

  };


  return {
    createEvent,
    getAllEvents,
    getEventById,
    editEvent,
    deleteEvent,
    joinEvent
  }
}();