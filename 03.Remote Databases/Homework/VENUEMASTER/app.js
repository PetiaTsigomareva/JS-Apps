function ajaxRequest() {
  const appKey = 'kid_BJ_Ke8hZg';
  const userName = 'guest';
  const password = 'pass';
  const getBase64 = btoa(`${userName}:${password}`);
  const authorization = `Basic ${getBase64}`;
  const headers = {'Content-Type': 'application/json'};
  const htmlElements = {
    dateInput: document.getElementById('venueDate'),
    getVenuesBtn: document.getElementById('getVenues'),
    venueInfoDiv: document.getElementById('venue-info'),

  };
  const methods = {get: 'GET', post: 'POST', put: 'PUT', delete: 'DELETE'};

  htmlElements.getVenuesBtn.addEventListener('click', getVenuesIds);

  function getVenuesIds() {
    let date = htmlElements.dateInput.value;
    resetVenueInfo();
    let url = `https://baas.kinvey.com/rpc/kid_BJ_Ke8hZg/custom/calendar?query=${date}`;
    let requestObj = getRequestObj(methods.post, '', 'include', authorization, headers);
    customFetch(url, requestObj, getVenuesInfo);
  }

  function customFetch(url, obj, method) {
    fetch(url, obj)
      .then(handler)
      .then(method)

  }

  function getVenuesInfo(data) {
    for (let _id of data) {
      let url = `https://baas.kinvey.com/appdata/kid_BJ_Ke8hZg/venues/${_id}`;
      let requestObj = getRequestObj(methods.get, '', 'include', authorization, headers);
      customFetch(url, requestObj, createVenue)
    }
  }

  function createVenue(venue) {
    const priceHeader = 'Ticket Price';
    const quantityHeader = 'Quantity';
    const selectOptionsCount = 5;
    const descriptionHeader = 'Venue description:';
    let venueDiv = createHtmlElement('div', 'venue', venue._id);

    let venueNameSpan = createHtmlElement('span', 'venue-name', '', '', '', venue.name);
    let moreInfoBtn = createHtmlElement('input', 'info', '', 'button', 'More info');
    venueNameSpan = appendChildrenToParrent([moreInfoBtn], venueNameSpan);

    let venueDetailsDiv = createHtmlElement('div', 'venue-details');
    venueDetailsDiv.style.display = 'none';
    moreInfoBtn.addEventListener('click', () => {
      if (venueDetailsDiv.style.display === 'none') {
        venueDetailsDiv.style.display = 'block';
      } else if (venueDetailsDiv.style.display === 'block') {
        venueDetailsDiv.style.display = 'none'
      } else {
        //incorrect display attribute
      }
    });
    let venueTable = createHtmlElement('table');
    let venueHeadersRow = createHtmlElement('tr');
    let venueHeaderPrice = createHtmlElement('th', '', '', '', '', priceHeader);
    let venueHeaderQuantity = createHtmlElement('th', '', '', '', '', quantityHeader);
    let venueHeaderEmpty = createHtmlElement('th', '', '', '', '', '');
    venueHeadersRow = appendChildrenToParrent([venueHeaderPrice, venueHeaderQuantity, venueHeaderEmpty], venueHeadersRow);
    let venueRow = createHtmlElement('tr');
    let venuePrice = createHtmlElement('td', 'venue-price', '', '', '', `${venue.price} lv`);
    let venueQuantity = createHtmlElement('td');
    let venueQuantitySelect = createHtmlElement('select', 'quantity');
    for (let i = 1; i <= selectOptionsCount; i++) {
      let option = createHtmlElement('option', '', '', '', `${i}`, i);
      venueQuantitySelect = appendChildrenToParrent([option], venueQuantitySelect);
    }
    venueQuantity = appendChildrenToParrent([venueQuantitySelect], venueQuantity);
    let venuePurchase = createHtmlElement('td');
    let venuePurchaseBtn = createHtmlElement('input', 'purchase', '', 'button', 'Purchase');
    venuePurchaseBtn.addEventListener('click', showConfirmPurchaseView);
    venuePurchase = appendChildrenToParrent([venuePurchaseBtn], venuePurchase);
    venueRow = appendChildrenToParrent([venuePrice, venueQuantity, venuePurchase], venueRow);
    venueTable = appendChildrenToParrent([venueHeadersRow, venueRow], venueTable);
    let venueDescriptionSpan = createHtmlElement('span', 'head', '', '', '', descriptionHeader);
    let venueDescriptionParg = createHtmlElement('p', 'description', '', '', '', `${venue.description}`);
    let venueStartingTimeParg = createHtmlElement('p', 'description', '', '', '', `Starting time: ${venue.startingHour}`);
    venueDetailsDiv = appendChildrenToParrent([venueTable, venueDescriptionSpan, venueDescriptionParg, venueStartingTimeParg], venueDetailsDiv);
    venueDiv = appendChildrenToParrent([venueNameSpan, venueDetailsDiv], venueDiv);

    htmlElements.venueInfoDiv = appendChildrenToParrent([venueDiv], htmlElements.venueInfoDiv);

  }

  function showConfirmPurchaseView(event) {
    const spanHeaderText = 'Confirm purchase';
    let venueDiv = event.target.parentNode.parentNode.parentNode.parentNode.parentNode;
    let venueId = venueDiv.getAttribute('id');

    let purchaseData = event.target.parentNode.parentNode;
    let price = Number.parseInt(purchaseData.children[0].textContent);

    let quantitySelect = purchaseData.children[1].children[0];
    let index = quantitySelect.selectedIndex;
    let quantity = quantitySelect.options[index].text;
    let name = event.target.parentNode.parentNode.parentNode.parentNode.parentNode.children[0].textContent;

    resetVenueInfo();
    let headerSpan = createHtmlElement('span', 'head', '', '', '', spanHeaderText);
    let purchaseInfoDiv = createHtmlElement('div', 'purchase-info');
    let nameSpan = createHtmlElement('span', '', '', '', '', name);
    let priceQuantitySpan = createHtmlElement('span', '', '', '', '', `${quantity} x ${price}`);
    let totalPriceSpan = createHtmlElement('span', '', '', '', '', `Total: ${quantity * price} lv`);
    let confirmBtn = createHtmlElement('input', '', '', 'button', 'Confirm');
    confirmBtn.addEventListener('click', confirmPurchase(event, venueId, quantity));

    purchaseInfoDiv = appendChildrenToParrent([nameSpan, priceQuantitySpan, totalPriceSpan, confirmBtn], purchaseInfoDiv);

    htmlElements.venueInfoDiv = appendChildrenToParrent([headerSpan, purchaseInfoDiv], htmlElements.venueInfoDiv);
  }

  function confirmPurchase(event, id, qty) {
    let url = `https://baas.kinvey.com/rpc/kid_BJ_Ke8hZg/custom/purchase?venue=${id}&qty=${qty}`;
    let requestObj = getRequestObj(methods.post, '', 'include', authorization, headers);
    customFetch(url, requestObj, showConfirmedPurchaseFragment);
  }

  function showConfirmedPurchaseFragment(data) {
    resetVenueInfo();
    const text = 'You may print this page as your ticket';
    let textParg = createHtmlElement('p', '', '', '', '', text);
    htmlElements.venueInfoDiv = appendChildrenToParrent([textParg], htmlElements.venueInfoDiv);
    htmlElements.venueInfoDiv.insertAdjacentHTML('beforeend',data.html);


  }

  function createHtmlElement(tagName, className, id, type, value, textContent) {
    let element = document.createElement(tagName);

    if (typeof className === 'string') {
      element.setAttribute('class', className);
    } else if (typeof className === 'object') {
      element.classList.add(...className);
    }
    if (id) {
      element.setAttribute('id', id);
    }
    if (type) {
      element.setAttribute('type', type);
    }
    if (value) {
      element.setAttribute('value', value);
    }

    if (textContent) {
      element.textContent = textContent;
    }
    return element;
  }

  function appendChildrenToParrent(children, parent) {
    children.forEach((child) => parent.appendChild(child));

    return parent;
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

  function resetVenueInfo() {
    if (htmlElements.venueInfoDiv.hasChildNodes()) {
      while (htmlElements.venueInfoDiv.hasChildNodes()) {
        htmlElements.venueInfoDiv.removeChild(htmlElements.venueInfoDiv.firstChild);
      }

    }


  }


}

ajaxRequest();