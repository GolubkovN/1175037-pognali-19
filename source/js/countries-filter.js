var alphabet = function () {
  var countNav = document.querySelectorAll(".alphabet__link");
  var filterContent = document.querySelectorAll(".countries-filter__tab");
  var filterName;

  for (var i = 0; i < countNav.length; i++) {
    countNav[i].addEventListener("click", selectFilterNav);
  };

  function selectFilterNav(evt) {
    evt.preventDefault();
    for(var i = 0; i < countNav.length; i++) {
      countNav[i].classList.remove("alphabet__link--active");
    }
    this.classList.add("alphabet__link--active");
    filterName = this.getAttribute("data-name");
    selectFilterContent(filterName);
  }

  function selectFilterContent(filterName) {
    for (var j = 0; j < filterContent.length; j++) {
      if (filterContent[j].classList.contains(filterName)) {
        filterContent[j].classList.add("countries-filter__tab--show");
      }else {
        filterContent[j].classList.remove("countries-filter__tab--show");
      }
    }
  }
};
alphabet();
