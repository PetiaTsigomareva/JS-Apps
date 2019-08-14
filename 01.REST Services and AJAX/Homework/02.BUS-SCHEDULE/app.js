function solve() {
  const firstStopID = 'depot';
  let currentId = '';
  let stopName = '';

  let infoBox = document.querySelector('#info span');
  let departBtn = document.getElementById('depart');
  let arriveBtn = document.getElementById('arrive');

  function depart() {
    if (infoBox.textContent === 'Not Connected') {
      currentId = firstStopID;
    }

    let url = `https://judgetests.firebaseio.com/schedule/${currentId}.json`;
    fetch(url)
      .then((responce) => responce.json())
      .then((data) => processingResponce(data))
      .catch((err) => error())
  }

  function arrive() {
    infoBox.textContent = `Arriving at ${stopName}`;
    departBtn.disabled = false;
    arriveBtn.disabled = true;
  }

  function processingResponce(jsonObj) {
    stopName = jsonObj.name;
    infoBox.textContent = `Next stop ${stopName}`;
    departBtn.disabled = true;
    arriveBtn.disabled = false;
    currentId = jsonObj.next;
  }

  function error() {
    const err = 'Error';
    infoBox = err;
    departBtn.disabled = true;
    arriveBtn.disabled = true;
  }


  return {
    depart,
    arrive
  };


}

let result = solve();