function ajaxCalls() {
  //For test this task please enter your APPKEY and username and password!!!!!!!!!!!!!!!!!!!
  const appKey = '???????'; //Enter your APPKey
  const url = `https://baas.kinvey.com/appdata/${appKey}/books`;
  const userName = 'guest';//IF username is not 'guest', Enter your !!!!!!!!!!!
  const password = 'guest';//IF password is not 'guest', Enter your !!!!!!!!!!!
  const getBase64 = btoa(`${userName}:${password}`);
  const authorization = `Basic ${getBase64}`;
  const headers = {'Content-Type': 'application/json'};

  const htmlElements = {
    loadBtn: document.getElementById('loadBooks'),
    tableElement: document.querySelector('table'),
    tableBodyElement: document.querySelector('tbody'),
    tableRowPattern: document.querySelector('tbody tr'),
    titleFormElement: document.getElementById('title'),
    authorFormElement: document.getElementById('author'),
    isbnFormElement: document.getElementById('isbn'),
    submitBtn: document.getElementById('submit'),
    formElement: document.querySelector('form'),
    editDoneBtn: document.getElementById('editBtn'),
    cancelBtn: document.getElementById('cancelBtn')
  };

  const methods = {get: 'GET', post: 'POST', put: 'PUT', delete: 'DELETE'};

  htmlElements.loadBtn.addEventListener('click', listAllBooks);
  htmlElements.submitBtn.addEventListener('click', createBook);


  function listAllBooks() {
    resetTableBody();
    let requestObj = getRequestObj('', '', 'include', authorization, headers);
    customFetch(url, requestObj, showBooksInTextArea);
  }

  function showBooksInTextArea(data) {
    for (let book of data) {
      let newTableRow = htmlElements.tableRowPattern.cloneNode(true);

      newTableRow.querySelectorAll('td')[0].textContent = book.title;
      newTableRow.querySelectorAll('td')[1].textContent = book.author;
      newTableRow.querySelectorAll('td')[2].textContent = book.isbn;
      let editBtn = newTableRow.querySelectorAll('td')[3].children[0];
      let deleteBtn = newTableRow.querySelectorAll('td')[3].children[1];
      let bookId = book._id;
      editBtn.addEventListener('click', () => {
        htmlElements.titleFormElement.value = newTableRow.querySelectorAll('td')[0].textContent;
        htmlElements.authorFormElement.value = newTableRow.querySelectorAll('td')[1].textContent;
        htmlElements.isbnFormElement.value = newTableRow.querySelectorAll('td')[2].textContent;

        htmlElements.submitBtn.style.display = 'none';

        htmlElements.editDoneBtn.style.display = 'block';
        htmlElements.editDoneBtn.setAttribute('bookId', bookId);
        htmlElements.editDoneBtn.addEventListener('click', updateBook);

        htmlElements.cancelBtn.style.display = 'block';
        htmlElements.cancelBtn.addEventListener('click', cancelEditingBook);//TODO
      });

      deleteBtn.setAttribute('bookId', book._id);
      deleteBtn.addEventListener('click', deleteBook);

      htmlElements.tableBodyElement.appendChild(newTableRow);
    }
  }

  function createBook(event) {
    event.preventDefault();
    let body=getBookData();
    if(body!==''){
      let requestObj = getRequestObj(methods.post, body, 'include', authorization, headers);
      customFetch(url, requestObj, '');
      refresh();
    }
  }

  function cancelEditingBook(event) {
    event.preventDefault();
    reset();
  }

  function updateBook(event) {
    event.preventDefault();
    let currentBookId = event.target.getAttribute('bookId');
    let requestObj = getRequestObj(methods.put, getBookData(), 'include', authorization, headers);
    let currentBookUrl = `${url}/${currentBookId}`;
    customFetch(currentBookUrl, requestObj, '');
    reset();
  }

  function deleteBook(event) {
    event.preventDefault();
    let currentTableRow = event.target.parentNode.parentNode;
    let currentBookId = event.target.getAttribute('bookId');
    let currentBookUrl = `${url}/${currentBookId}`;
    let requestObj = getRequestObj(methods.delete, {currentBookId}, 'include', authorization, headers);
    customFetch(currentBookUrl, requestObj, '');
    refresh();
  }

  function customFetch(url, obj, method) {
    fetch(url, obj)
      .then(handler)
      .then(method)
  }

  function getBookData() {
    let book = '';
    if (htmlElements.titleFormElement.value !== '' &&
      htmlElements.authorFormElement.value !== '' &&
      htmlElements.isbnFormElement.value !== '') {
      book = {
        title: htmlElements.titleFormElement.value,
        author: htmlElements.authorFormElement.value,
        isbn: htmlElements.isbnFormElement.value
      };
      resetInputField();

    }
    return book;

  }

  function getRequestObj(methodName, body, credentials, authorization, headers) {
    let result = {};

    if (methodName !== '') {
      result['method'] = methodName;
    }
    if (body !== '') {
      result['body'] = JSON.stringify(body);

    }
    if (credentials !== '') {
      result['credentials'] = credentials;

    }

    if (authorization !== '') {
      result['Authorization'] = authorization;

    }
    if (headers !== '') {
      result['headers'] = headers;
    }

    return result;

  }

  function handler(responce) {
    if (responce.status > 400) {
      throw new Error(`Error: ${responce.statusText}`);
    }
    return responce.json();
  }

  function resetTableBody() {
    htmlElements.tableBodyElement.innerHTML = '';
  }

  function resetInputField() {
    htmlElements.titleFormElement.value = '';
    htmlElements.authorFormElement.value = '';
    htmlElements.isbnFormElement.value = '';
  }

  function reset() {
    resetInputField();
    htmlElements.submitBtn.style.display = 'block';
    htmlElements.editDoneBtn.style.display = 'none';
    htmlElements.cancelBtn.style.display = 'none';
    refresh();
  }

  function refresh() {
    resetTableBody();
    htmlElements.loadBtn.click();
  }

}

ajaxCalls();
