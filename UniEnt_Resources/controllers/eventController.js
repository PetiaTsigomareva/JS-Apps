const eventController = function () {

  const getCreateEvent = function (context) {

    const loggedIn = storage.getData('userInfo') !== null;

    if (loggedIn) {
      const username = JSON.parse(storage.getData('userInfo')).username;
      context.loggedIn = loggedIn;
      context.username = username.toUpperCase();
    }
    // storage.isLoggedInUser(context);

    context.loadPartials({
      header: './views/common/header.hbs',
      footer: './views/common/footer.hbs'
    }).then(function () {
      this.partial('./views/event/createEventPage.hbs');
    });
  };

  const postCreateEvent = function (context) {
    eventModel.createEvent(context.params)
      .then(helper.handler)
      .then((data) => {
        //TODO notification
        //redirect to home page
        homeController.getHome(context);
      })
  };

  const getDetailsEvent = async function (context) {

      const loggedIn = storage.getData('userInfo') !== null;
      if (loggedIn) {
        const username = JSON.parse(storage.getData('userInfo')).username;
        context.loggedIn = loggedIn;
        context.username = username.toUpperCase();
        let response = await eventModel.getEventById(context.params.id);
        let event = await response.json();
        Object.keys(event).forEach((key) => {
          context[key] = event[key]
        });
        context.isCreator = username === event.organizer;
      }


    context.loadPartials({
      header: './views/common/header.hbs',
      footer: './views/common/footer.hbs'
    }).then(function () {
      this.partial('./views/event/eventDetails.hbs');
    });
  };

  const getEditEvent = async function (context) {

    const loggedIn = storage.getData('userInfo') !== null;
    if (loggedIn) {
      const username = JSON.parse(storage.getData('userInfo')).username;
      context.loggedIn = loggedIn;
      context.username = username.toUpperCase();
      let response = await eventModel.getEventById(context.params.id);
      let event = await response.json();
      Object.keys(event).forEach((key) => {
        context[key] = event[key]
      });

    }
    context.loadPartials({
      header: './views/common/header.hbs',
      footer: './views/common/footer.hbs'
    }).then(function () {
      this.partial('./views/event/editEventPage.hbs');
    });
  };

  const postEditEvent = function (context) {
    eventModel.editEvent(context.params)
      .then(helper.handler)
      .then((data) => {
        homeController.getHome(context);
      })

  };

  const postDeleteEvent = function (context) {
    eventModel.deleteEvent(context.params.id)
      .then(helper.handler)
      .then((data) => {
        console.log(data);

        homeController.getHome(context);
      })

  };

  const getJoinEvent = async function (context) {
    const loggedIn = storage.getData('userInfo') !== null;
    if (loggedIn) {
      const username = JSON.parse(storage.getData('userInfo')).username;
      context.loggedIn = loggedIn;
      context.username = username.toUpperCase();
      let response = await eventModel.getEventById(context.params.id);
      let event = await response.json();

      let joinResponse = await eventModel.joinEvent(event);

      homeController.getHome(context);

    }


  };
  const postJoinEvent = function (context) {
    eventModel.joinEvent(context.params)
      .then(helper.handler)
      .then((data) => {
        console.log(data);
        // eventController.getDetailsEvent(context);
      })


  };
  return {
    getCreateEvent,
    postCreateEvent,
    getDetailsEvent,
    getEditEvent,
    postEditEvent,
    postDeleteEvent,
    getJoinEvent,
    postJoinEvent
  }
}();