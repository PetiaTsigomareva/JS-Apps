function attachEvents() {
  const locationUrl = 'https://judgetests.firebaseio.com/locations.json';
  const symbols = {
    sunny: '☀',
    partlySunny: '⛅',
    overcast: '☁',
    rain: '☂',
    degrees: '°'
  };

  const htmlElemens = {
    locatinInput: document.getElementById('location'),
    getWeatherBtn: document.getElementById('submit'),
    forecastDiv: document.getElementById('forecast'),
    currentForecastDiv: document.getElementById('current'),
    upcomingForecastDiv: document.getElementById('upcoming')
  };

  htmlElemens.getWeatherBtn.addEventListener('click', locationCodeByLocationName);

  function locationCodeByLocationName() {

    resetElements();
    //get location code
    customFetch(locationUrl, getLocationCode);
  }

  function getLocationCode(data) {
    let locationObj = data.filter((d) => d.name === htmlElemens.locatinInput.value)[0];
    let code = locationObj.code;

    const currentForecastUrl = `https://judgetests.firebaseio.com/forecast/today/${code}.json`;
    customFetch(currentForecastUrl, loadCurrentWeather);

    const upComingForecastUrl = `https://judgetests.firebaseio.com/forecast/upcoming/${code}.json`;
    customFetch(upComingForecastUrl, loadUpcomingWeather);

  }

  function loadCurrentWeather(data) {
    // load current weather
    htmlElemens.forecastDiv.setAttribute('style', 'display:block');
    let forecastsDiv = createHtmlElement('div', 'forecasts');

    let symbol = getSymbol(data.forecast.condition);
    let spanConditionSymbol = createHtmlElement('span', ['condition', 'symbol'], symbol);
    let spanCondition = createHtmlElement('span', 'condition');

    let spanName = createHtmlElement('span', 'forecast-data', data.name);
    let temperaturs = `${data.forecast.low}${symbols.degrees}/${data.forecast.high}${symbols.degrees}`;
    let spanTemperatures = createHtmlElement('span', 'forecast-data', temperaturs);
    let spanConditionText = createHtmlElement('span', 'forecast-data', data.forecast.condition);

    spanCondition = appendChildrenToParrent([spanName, spanTemperatures, spanConditionText], spanCondition);
    forecastsDiv = appendChildrenToParrent([spanConditionSymbol, spanCondition], forecastsDiv);
    htmlElemens.currentForecastDiv = appendChildrenToParrent([forecastsDiv], htmlElemens.currentForecastDiv);

  }

  function loadUpcomingWeather(data) {
    let forecastInfoDiv = createHtmlElement('div', 'forecast-info');
    let forecastFor3Days = data.forecast;
    for (let forecast of forecastFor3Days) {
      let upcomingDiv = createHtmlElement('div', 'upcoming');

      let symbol = getSymbol(forecast.condition);
      let spanConditionSymbol = createHtmlElement('span', 'symbol', symbol);
      let temperaturs = `${forecast.low}${symbols.degrees}/${forecast.high}${symbols.degrees}`;
      let spanTemperatures = createHtmlElement('span', 'forecast-data', temperaturs);
      let spanConditionText = createHtmlElement('span', 'forecast-data', forecast.condition);

      upcomingDiv = appendChildrenToParrent([spanConditionSymbol, spanTemperatures, spanConditionText], upcomingDiv);
      forecastInfoDiv = appendChildrenToParrent([upcomingDiv], forecastInfoDiv);
    }
    htmlElemens.upcomingForecastDiv = appendChildrenToParrent([forecastInfoDiv], htmlElemens.upcomingForecastDiv);

  }

  function getSymbol(symbolText) {
    let result = '';
    switch (symbolText) {
      case 'Sunny':
        result = symbols.sunny;
        break;
      case 'Partly sunny':
        result = symbols.partlySunny;
        break;
      case 'Overcast':
        result = symbols.overcast;
        break;
      case 'Rain':
        result = symbols.rain;
        break;
      default:
        result = 'Invalided symbol text!!!';
        break;
    }

    return result;
  }

  function customFetch(url, method) {
    fetch(url)
      .then(handler)
      .then(method)
  }

  function createHtmlElement(tagName, className, textContent) {
    let element = document.createElement(tagName);

    if (typeof className === 'string') {
      element.setAttribute('class', className);
    } else if (typeof className === 'object') {
      element.classList.add(...className);
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


  function handler(responce) {
    if (responce.status > 400) {
      // throw new Error(`Error: ${responce.statusText}`);
      error(`Error: ${responce.status} ${responce.statusText}`);
    }
    return responce.json();
  }

  function error(text) {
    htmlElemens.forecastDiv.setAttribute('style', 'display:block');
    let h1 = createHtmlElement('h1', 'forecast-data', text);
    htmlElemens.forecastDiv = appendChildrenToParrent([h1], htmlElemens.forecastDiv);
  }

  function resetElements() {
    if (htmlElemens.currentForecastDiv.children[1] !== undefined && htmlElemens.upcomingForecastDiv.children[1] !== undefined) {
      htmlElemens.currentForecastDiv.children[1].remove();
      htmlElemens.upcomingForecastDiv.children[1].remove();
    }

  }

}

attachEvents();