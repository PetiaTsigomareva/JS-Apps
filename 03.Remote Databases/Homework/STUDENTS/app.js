function ajaxCalls() {
  //For test this task please enter your APPKEY and username and password!!!!!!!!!!!!!!!!!!!
  const appKey = '???????'; //Enter your APPKey
  const url = `https://baas.kinvey.com/appdata/${appKey}/students`;
  const userName = 'guest';//IF username is not 'guest', Enter your !!!!!!!!!!!
  const password = 'guest';//IF password is not 'guest', Enter your !!!!!!!!!!!
  const getBase64 = btoa(`${userName}:${password}`);
  const authorization = `Basic ${getBase64}`;
  const headers = {'Content-Type': 'application/json'};


  const htmlElements = {
    tableElement: document.getElementById('results'),
    tableBodyElement: document.querySelector('tbody'),
    idElement: document.getElementById('idStudent'),
    firstNameElement: document.getElementById('firstName'),
    lastNameElement: document.getElementById('lastName'),
    facultyNumberElement: document.getElementById('facultyNumber'),
    gradeElement: document.getElementById('grade'),
    addBtn: document.getElementById('add'),
    loadBtn: document.getElementById('load'),
    cancelBtn: document.getElementById('cancel')
  };


  htmlElements.addBtn.addEventListener('click', addStudent);
  htmlElements.loadBtn.addEventListener('click', loadAllStudents);
  htmlElements.cancelBtn.addEventListener('click', cancelAddStudent);

  const methods = {get: 'GET', post: 'POST', put: 'PUT', delete: 'DELETE'};


  function loadAllStudents(event) {
    event.preventDefault();
    resetTableBody();
    let requestObj = getRequestObj('', '', 'include', authorization, headers);
    customFetch(url, requestObj, showStudents);
  }

  function showStudents(data) {
    data = data.sort((a, b) => {
      return a.ID - b.ID;
    });

    for (let student of data) {
      let newTableRow = document.createElement('tr');

      let id = document.createElement('td');
      id.textContent = student['ID'];

      let firstNameData = document.createElement('td');
      firstNameData.textContent = student['FirstName'];

      let lastNameData = document.createElement('td');
      lastNameData.textContent = student['LastName'];


      let facultyNumberData = document.createElement('td');
      facultyNumberData.textContent = student['FacultyNumber'];

      let gradeData = document.createElement('td');
      gradeData.textContent = student['Grade'];


      newTableRow.appendChild(id);
      newTableRow.appendChild(firstNameData);
      newTableRow.appendChild(lastNameData);
      newTableRow.appendChild(facultyNumberData);
      newTableRow.appendChild(gradeData);


      htmlElements.tableBodyElement.appendChild(newTableRow);
    }
  }

  function addStudent(event) {
    event.preventDefault();
    let body = getStudentData();
    if (body !== '') {
      let requestObj = getRequestObj(methods.post, body, 'include', authorization, headers);
      customFetch(url, requestObj, '');
      refresh();

    }

  }

  function cancelAddStudent(event) {
    event.preventDefault();
    resetInputFields();
  }


  function customFetch(url, obj, method) {
    fetch(url, obj)
      .then(handler)
      .then(method)
  }

  function getStudentData() {
    let student = '';
    if (htmlElements.idElement.value !== '' &&
      htmlElements.firstNameElement.value !== '' &&
      htmlElements.lastNameElement.value !== '' &&
      htmlElements.facultyNumberElement.value !== '' &&
      htmlElements.gradeElement.value !== '') {
      student = {
        'ID': htmlElements.idElement.value,
        'FirstName': htmlElements.firstNameElement.value,
        'LastName': htmlElements.lastNameElement.value,
        'FacultyNumber': htmlElements.facultyNumberElement.value,
        'Grade': htmlElements.gradeElement.value
      };

      resetInputFields();
    }
    return student;
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

  function resetInputFields() {
    htmlElements.idElement.value = '';
    htmlElements.firstNameElement.value = '';
    htmlElements.lastNameElement.value = '';
    htmlElements.facultyNumberElement.value = '';
    htmlElements.gradeElement.value = '';
  }

  function refresh() {
    resetTableBody();
    htmlElements.loadBtn.click();
  }


}

ajaxCalls();