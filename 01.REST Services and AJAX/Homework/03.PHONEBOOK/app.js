function attachEvents() {
  const url = 'https://phonebook-nakov.firebaseio.com/phonebook.json';

  let ulPhonebook = document.getElementById('phonebook');

  const loadBtn = document.getElementById('btnLoad');
  loadBtn.addEventListener('click', load);

  const pesonInput = document.getElementById('person');
  const phoneInput = document.getElementById('phone');

  const createBtn = document.getElementById('btnCreate');
  createBtn.addEventListener('click', createPhonebookEntry);


  function load() {
    fetch(url)
      .then((responce) => responce.json())
      .then((data) => loadPhonebookEntries(data))
      .catch((err) => displayError(err))
  }

  function loadPhonebookEntries(phones) {
    resetPhoneBookItems();

    let phoneBook = Object.entries(phones);
    for (let p of phoneBook) {
      let deleteKey = p[0];
      let person = p[1].person;
      let phone = p[1].phone;

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.setAttribute('deleteKey', deleteKey);
      deleteBtn.addEventListener('click', deletePhoneBookEntry);

      const listItem = document.createElement('li');
      listItem.textContent = `${person}: ${phone}`;
      listItem.appendChild(deleteBtn);

      ulPhonebook.appendChild(listItem);
    }
  }
  function createPhonebookEntry() {
    let person = pesonInput.value;
    let phone = phoneInput.value;
    let data = {person, phone};

    let postRequest = {
      method: 'post',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(data)
    };

    fetch(url, postRequest)
      .then(() => load());
    resetInputFields();

  }

  function deletePhoneBookEntry() {
    let key = this.getAttribute('deleteKey');
    let deleteUrl = `https://phonebook-nakov.firebaseio.com/phonebook/${key}.json`;
    let deleteRequest = {
      method: 'delete',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({key})
    };

    fetch(deleteUrl, deleteRequest)
      .then(() => load());

  }

  function displayError(err) {
    const listItem = document.createElement('li');
    listItem.textContent = err;
    ulPhonebook.appendChild(listItem);
  }

  function resetPhoneBookItems() {
    while (ulPhonebook.firstChild) ulPhonebook.removeChild(ulPhonebook.firstChild);
  }

  function resetInputFields() {
    pesonInput.value = '';
    phoneInput.value = '';
  }
}


attachEvents();