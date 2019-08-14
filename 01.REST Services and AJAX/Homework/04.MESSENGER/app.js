function attachEvents() {
  const url = 'https://rest-messanger.firebaseio.com/messanger.json';
  const textArea = document.getElementById('messages');
  const nameInput = document.getElementById('author');
  const messageInput = document.getElementById('content');
  const sendBtn = document.getElementById('submit');
  sendBtn.addEventListener('click', sendMessage);
  const refreshBtn = document.getElementById('refresh');
  refreshBtn.addEventListener('click', getAllMessage);

  function sendMessage() {
    let data = {
      author: nameInput.value,
      content: messageInput.value
    };
    let postRequest = {
      method: 'post',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(data)
    };
    fetch(url, postRequest);
    resetInputFields();

 }

  function getAllMessage() {
    fetch(url)
      .then((responce) => responce.json())
      .then((data) => printAllMessage(data))
      .catch((err) => displayError(err));
  }

  function printAllMessage(obj) {
    let messages = Object.values(obj);
    for (let message of messages) {
      let textareaRow = `${message.author}: ${message.content}\n`;
      textArea.value += textareaRow;
    }
  }

  function resetInputFields() {
    nameInput.value = '';
    messageInput.value = '';
  }

  function displayError(err) {
    textArea.value = err;
  }
}

attachEvents();