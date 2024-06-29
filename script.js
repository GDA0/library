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
  displayBooks();

  const modal = bootstrap.Modal.getInstance(bookModal);
  modal.hide();

  bookForm.reset();
  bookForm.classList.remove("was-validated");
});

function displayBooks() {
  booksContainer.innerHTML = "";

  myLibrary.forEach((book, index) => {
    let card = document.createElement("div");
    card.classList.add("card", "mb-1");

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    let cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title", "fw-bold");
    cardTitle.textContent = book.title;
    cardBody.appendChild(cardTitle);

    let cardAuthor = document.createElement("p");
    cardAuthor.classList.add("card-text", "mb-0");
    cardAuthor.textContent = `Author: ${book.author}`;
    cardBody.appendChild(cardAuthor);

    let cardPages = document.createElement("p");
    cardPages.classList.add("card-text", "mb-0");
    cardPages.textContent = `Pages: ${book.numOfPages}`;
    cardBody.appendChild(cardPages);

    let cardReadStatus = document.createElement("p");
    cardReadStatus.classList.add("card-text", "mb-0");
    cardReadStatus.textContent = book.isRead ? "Read" : "Not Read";
    cardBody.appendChild(cardReadStatus);

    let toggleReadBtn = document.createElement("button");
    toggleReadBtn.classList.add("btn", "btn-primary", "me-2");
    toggleReadBtn.textContent = book.isRead ? "Mark as Unread" : "Mark as Read";
    toggleReadBtn.addEventListener("click", () => {
      book.isRead = !book.isRead;
      displayBooks();
    });
    cardBody.appendChild(toggleReadBtn);

    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("btn", "btn-danger");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
      myLibrary.splice(index, 1);
      displayBooks();
    });
    cardBody.appendChild(deleteBtn);

    card.appendChild(cardBody);

    booksContainer.appendChild(card);
  });
}
