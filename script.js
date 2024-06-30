class Library {
  constructor() {
    this.books = [];
  }

  addBook(book) {
    this.books.push(book);
  }

  removeBook(index) {
    this.books.splice(index, 1);
  }

  toggleReadStatus(index) {
    this.books[index].isRead = !this.books[index].isRead;
  }
}

class Book {
  constructor(title, author, numOfPages, isRead = false) {
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.isRead = isRead;
  }
}

class BookView {
  constructor() {
    this.bookModal = document.querySelector("#book-modal");
    this.bookForm = document.querySelector("form");
    this.addBtn = document.querySelector("#add-button");
    this.formSubmitBtn = document.querySelector("#form-submit-btn");
    this.booksContainer = document.querySelector("#books-container");
  }

  bindAddBook(handler) {
    this.addBtn.addEventListener("click", () => this.formSubmitBtn.click());
    this.bookForm.addEventListener(
      "submit",
      (event) => {
        event.preventDefault();
        if (this.bookForm.checkValidity()) {
          const title = this.bookForm.querySelector("#title").value;
          const author = this.bookForm.querySelector("#author").value;
          const numOfPages = this.bookForm.querySelector("#num-of-pages").value;
          const isRead = this.bookForm.querySelector("#is-read").checked;
          handler({ title, author, numOfPages, isRead });
          this.bookForm.reset();
          this.bookForm.classList.remove("was-validated");
        } else {
          event.stopPropagation();
          this.bookForm.classList.add("was-validated");
        }
      },
      false
    );
  }

  displayBooks(books, handlers) {
    this.booksContainer.innerHTML = "";
    books.forEach((book, index) => {
      const card = document.createElement("div");
      card.classList.add("card");

      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");

      const cardTitle = document.createElement("h5");
      cardTitle.classList.add("card-title", "fw-bold");
      cardTitle.textContent = book.title;
      cardBody.appendChild(cardTitle);

      const cardAuthor = document.createElement("p");
      cardAuthor.classList.add("card-text", "mb-0");
      cardAuthor.textContent = `Author: ${book.author}`;
      cardBody.appendChild(cardAuthor);

      const cardPages = document.createElement("p");
      cardPages.classList.add("card-text", "mb-0");
      cardPages.textContent = `Pages: ${book.numOfPages}`;
      cardBody.appendChild(cardPages);

      const cardReadStatus = document.createElement("p");
      cardReadStatus.classList.add("card-text", "mb-2");
      cardReadStatus.textContent = book.isRead ? "Read" : "Not Read";
      cardBody.appendChild(cardReadStatus);

      const toggleReadBtn = document.createElement("button");
      toggleReadBtn.classList.add("btn", "btn-primary", "me-2");
      toggleReadBtn.textContent = book.isRead
        ? "Mark as Unread"
        : "Mark as Read";
      toggleReadBtn.addEventListener("click", () => handlers.toggleRead(index));
      cardBody.appendChild(toggleReadBtn);

      const deleteBtn = document.createElement("button");
      deleteBtn.classList.add("btn", "btn-danger");
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", () => handlers.delete(index));
      cardBody.appendChild(deleteBtn);

      card.appendChild(cardBody);
      this.booksContainer.appendChild(card);
    });
  }
}
