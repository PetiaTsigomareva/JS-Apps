function getInfo() {
  const stopNameDiv = document.getElementById('stopName');
  const ul = document.getElementById('buses');
  let stopId = document.getElementById('stopId');
  let url = `https://judgetests.firebaseio.com/businfo/${stopId.value}.json`;
  const err = 'Error';
//-------------With XMLHttpRequest----------
//   const req = new XMLHttpRequest();
//   req.onreadystatechange = function () {
//     if (this.readyState == 4 && this.status == 200) {
//       let stopJSON = JSON.parse(this.responseText);
//       createResult(stopJSON);
//     } else {
//       error();
//     }
//
//   };
//
//   req.open("GET", url);
//   req.send();

//-----------------With Fetch API--------------
  fetch(url)
    .then((responce) => responce.json())
    .then((data) => createResult(data))
    .catch((err) => error());

  function createResult(jsonObj) {
    resetElements();

    stopNameDiv.textContent = jsonObj.name;
    let busesObj = jsonObj.buses;
    let busIds = Object.keys(busesObj);
    for (let key of busIds) {
      let li = document.createElement('li');
      li.textContent = `Bus ${key} arrives in ${busesObj[key]}`;
      ul.appendChild(li);
    }
  }

  function error() {
    resetElements();
    stopNameDiv.textContent = err;

  }

  function resetElements() {
    stopNameDiv.textContent = '';
    while (ul.firstChild) ul.removeChild(ul.firstChild);
    stopId.value = '';
  }
}