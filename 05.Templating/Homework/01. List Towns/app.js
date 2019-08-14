function attachEvents() {
  let townsInput = document.getElementById('towns');
  let loadBtn = document.getElementById('btnLoadTowns');
  loadBtn.addEventListener('click', loadTowns);

  function loadTowns() {
    let towns = townsInput.value.split(', ').map(t => ({name:t}));
    renderTowns(towns);
  }

  function renderTowns(towns) {
    let townsTemplate = document.getElementById('towns-template').innerHTML;
    let compiled = Handlebars.compile(townsTemplate);
    let rendered = compiled({towns});
    document.getElementById('root').innerHTML = rendered;
  }
}

attachEvents();