(() => {
  renderCatTemplate();

  function renderCatTemplate() {
    let catTemplate = document.getElementById('cat-template').innerHTML;
    let compiled = Handlebars.compile(catTemplate);
    let render = compiled({cats: window.cats});

    document.getElementById('allCats').innerHTML = render;

    let catSection = document.getElementById('allCats');
    catSection.addEventListener('click', showMoreInfo);

    function showMoreInfo(event) {
      if (event.target.className === 'showBtn') {
        if (event.target.textContent === 'Show status code') {
          event.target.textContent = 'Hide Status Code';
          event.target.nextElementSibling.style.display = 'block';
        } else {
          event.target.textContent = 'Show status code';
          event.target.nextElementSibling.style.display = 'none';
        }
      }

    }
  }

})();
