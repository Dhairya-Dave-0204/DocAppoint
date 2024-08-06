/* ------------------ NAVIGATION BAR ------------------ */

const btn= document.getElementById("btn")
const list= document.querySelector(".list")

btn.addEventListener("click", ()=>{
  list.classList.toggle("show")
});

/* ------------------ CONTACT FORM ------------------ */
const inputs = document.querySelectorAll(".input");

function focusFunc() {
  let parent = this.parentNode;
  parent.classList.add("focus");
}

function blurFunc() {
  let parent = this.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", focusFunc);
  input.addEventListener("blur", blurFunc);
});


/* ------------------ ABOUT READ MORE ------------------ */
const text = document.getElementById("show-more");
const readMoreBtn = document.getElementById("showmore-btn");

readMoreBtn.addEventListener("click", () => {
  text.classList.toggle("active");
});