const myLibrary = [];
const bookModal = document.querySelector("#book-modal");
const bookForm = document.querySelector("form");
const addBtn = document.querySelector("#add-button");
const formSubmitBtn = document.querySelector("#form-submit-btn");
const booksContainer = document.querySelector("#books-container");

class Book {
  constructor(title, author, numOfPages, isRead = false) {
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.isRead = isRead;
  }
}

addBtn.addEventListener("click", () => formSubmitBtn.click());

bookForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!bookForm.checkValidity()) {
    event.stopPropagation();
    return;
  }

  bookForm.classList.add("was-validated");

  let title = bookForm.querySelector("#title").value;
  let author = bookForm.querySelector("#author").value;
  let numOfPages = bookForm.querySelector("#num-of-pages").value;
  let isRead = bookForm.querySelector("#is-read").checked;

  const newBook = new Book(title, author, numOfPages, isRead);

  myLibrary.push(newBook);

  const modal = bootstrap.Modal.getInstance(bookModal);
  modal.hide();

  bookForm.reset();
  bookForm.classList.remove("was-validated");
});
