const bookForm = document.querySelector("form");
const addBtn = document.querySelector("#add-button");
const formSubmitBtn = bookForm.querySelector("#form-submit-btn");

bookForm.addEventListener(
  "submit",
  (event) => {
    if (!bookForm.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }

    bookForm.classList.add("was-validated");
  },
  false
);
addBtn.addEventListener("click", () => formSubmitBtn.click());
