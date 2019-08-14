const storage = function () {

  const appKey = "Enter your Kivey appKEY";
  const appSecret = "Enter your Kivey appSecret";


  const getData = function (key) {
    return localStorage.getItem(key + appKey);
  };

  const saveData = function (key, value) {
    localStorage.setItem(key + appKey, JSON.stringify(value));
  };

  const saveUser = function (data) {
    saveData("userInfo", data);
    saveData("authToken", data._kmd.authtoken);
  };

  const deleteUser = function () {
    localStorage.removeItem("userInfo" + appKey);
    localStorage.removeItem("authToken" + appKey);
  };
//TODO
  const isLoggedInUser = async function (context) {
    const loggedIn = getData('userInfo') !== null;

    if (loggedIn) {
      const username = JSON.parse(getData('userInfo')).username;
      context.loggedIn = loggedIn;
      context.username = username.toUpperCase();
      try {
        let response = await eventModel.getAllEvents();
        context.events = await response.json()
      } catch (e) {
        console.log(e);
      }
    }

  };

  return {
    getData,
    saveData,
    saveUser,
    deleteUser,
    isLoggedInUser,
    appKey,
    appSecret
  }
}();