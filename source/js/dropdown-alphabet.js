var select = document.querySelector(".steps__select-btn--choose");
var minAlphabet = document.querySelector(".steps__alphabet-wrapper");

select.addEventListener("click", function(){
  minAlphabet.classList.toggle("is-show");
})
