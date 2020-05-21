document.addEventListener("DOMContentLoaded", function() {
  console.log("DOM fully loaded and parsed");

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

  var modalOpen = document.querySelector(".rates__link");
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
});

function initMap() {
  var pos = {lat: 59.938891, lng: 30.323126}
  var opt = {
    center: pos,
    zoom: 17,
  };

  var myMap = new google.maps.Map(document.getElementById("map"), opt);

  var marker = new google.maps.Marker({
    position: pos,
    map: myMap,
    title: "Здесь мы находимся",
    icon: {
      url: "../img/map-marker.svg",
      scaledSize: new google.maps.Size(30, 30)
    }
  });

  var select = document.querySelector(".steps__select-btn--choose");
  var minAlphabet = document.querySelector(".steps__alphabet-wrapper");

  select.addEventListener("click", function(){
    select.classList.toggle("steps__select-btn--blue");
    minAlphabet.classList.toggle("is-show");
  })
}


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


