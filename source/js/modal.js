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
