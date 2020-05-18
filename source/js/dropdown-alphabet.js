var select = document.querySelector(".steps__select-btn--choose");
var minAlphabet = document.querySelector(".steps__alphabet-wrapper");

select.addEventListener("click", function(){
  select.classList.toggle("steps__select-btn--blue");
  minAlphabet.classList.toggle("is-show");
})
