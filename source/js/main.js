var header = document.querySelector(".header");
var toggleNav = document.querySelector(".header__toggle");

header.classList.remove("header--nojs");

toggleNav.addEventListener("click", function () {
  if (header.classList.contains("header--closed")) {
    header.classList.remove("header--closed");
    header.classList.add("header--opened");
  }else {
    header.classList.add("header--closed");
    header.classList.remove("header--opened");
  }
})

function anim(duration) {
  var temp;
  return function(sel) {
      cancelAnimationFrame(temp);
      var start = performance.now();
      var from = window.pageYOffset || document.documentElement.scrollTop,
      to = document.querySelector(sel).getBoundingClientRect().top;
      requestAnimationFrame(function step(timestamp) {
          var progress = (timestamp - start) / duration;
          1 <= progress && (progress = 1);
          window.scrollTo(0, from + to * progress | 0);
          1 > progress && (temp = requestAnimationFrame(step))
      })
  }
};
var scrollMenu = anim(700)

/* modal with rates */

/*var modalOpen = document.querySelector(".rates__link");
var modal = document.querySelector(".modal");
var modalClose = document.querySelector(".modal__close");

modalOpen.addEventListener("click", function (evt) {
  evt.preventDefault();
  modal.classList.add("modal--show");
});
modalClose.addEventListener("click", function (evt) {
  evt.preventDefault();
  modal.classList.remove("modal--show");
});

/* countries filter */

var filterToggle = document.querySelector(".countries-filter__toggle");
var countriesFilter = document.querySelector(".countries-filter");
var filterCollapse = document.querySelector(".countries-filter__collapse");


countriesFilter.classList.remove("countries-filter--nojs");

filterToggle.addEventListener("click", function () {
  if(countriesFilter.classList.contains("countries-filter--closed")) {
    countriesFilter.classList.remove("countries-filter--closed");
    countriesFilter.classList.add("countries-filter--opened");
  }else {
    countriesFilter.classList.add("countries-filter--closed");
    countriesFilter.classList.remove("countries-filter--opened");
  }
});

filterCollapse.addEventListener("click", function() {
  countriesFilter.classList.remove("countries-filter--opened");
  countriesFilter.classList.add("countries-filter--closed");
});

