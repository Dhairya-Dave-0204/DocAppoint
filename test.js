const accordians = document.querySelectorAll(".accordian");

accordians.forEach(accordian => {
    const icon = accordian.querySelector(".icon");
    const answer = accordian.querySelector(".faq-detail");

    accordian.addEventListener("click", () => {
        if (icon.classList.contains("active")) {
            icon.classList.remove("active");
            answer.style.maxHeight = null;
        } else {
            icon.classList.add("active");
            answer.style.maxHeight = answer.scrollHeight + "px";
        }
    })
});


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