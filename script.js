class Book {
  constructor(title, author, pages, isRead, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.id = id;
  }
}

class Library {
  constructor() {
    this.library = [];
  }
  addNewBook({ title, author, pages, isRead, id }) {
    if (isRead == "on") {
      console.log("!??");
      this.library.push(
        new Book(title, author, pages, "Yes", crypto.randomUUID())
      );
    } else if (this.isRead == undefined) {
      this.library.push(
        new Book(title, author, pages, "No", crypto.randomUUID())
      );
    }
  }

  removeAllBooks() {
    this.library.length = 0;
  }

  scanForBooks() {
    this.library.forEach((book, index) => {
      if (document.querySelector(`[data-id="${book.id}"]`) == null) {
        let bookContainer = document.createElement("div");
        bookContainer.classList.add("book-container");
        bookContainer.dataset.id = book.id;
        let bookData = document.createElement("div");

        let removeBookButton = document.createElement("button");
        removeBookButton.textContent = "Remove book";
        removeBookButton.classList.add("remove-book-button");

        let changeReadStatusButton = document.createElement("button");
        changeReadStatusButton.classList.add("change-read-status-button");
        if (book.isRead == "No")
          changeReadStatusButton.textContent = "Mark as read";
        else if (book.isRead == "Yes")
          changeReadStatusButton.textContent = "Mark as unread";

        if (book.author == "") book.author = "Not specified";

        let bookControlButtons = document.createElement("div");
        bookControlButtons.classList.add("book-control-buttons");

        bookData.innerHTML =
          "<p>" +
          "Author: " +
          book.author +
          "</p>" +
          "<p>" +
          "Pages: " +
          book.pages +
          "</p>" +
          "<p class = 'read-status'>" +
          "Read: " +
          book.isRead +
          "</p>";
        bookContainer.innerHTML =
          "<p class = 'book-title'>" +
          book.title +
          "</p>" +
          "<div class = 'book-data'>" +
          bookData.innerHTML +
          "</div>";

        removeBookButton.addEventListener("click", (event) => {
          let bookID = this.library
            .map((book) => book.id)
            .indexOf(
              event.target.parentElement.parentElement.getAttribute("data-id")
            );

          this.library.splice(bookID, 1);
          event.target.parentElement.parentElement.remove();
        });

        changeReadStatusButton.addEventListener("click", (event) => {
          let bookID = this.library
            .map((book) => book.id)
            .indexOf(
              event.target.parentElement.parentElement.getAttribute("data-id")
            );

          if (this.library[bookID].isRead == "No")
            this.library[bookID].isRead = "Yes";
          else if (this.library[bookID].isRead == "Yes")
            this.library[bookID].isRead = "No";
          event.target.parentElement.parentElement.querySelector(
            ".read-status"
          ).textContent = "Read: " + this.library[bookID].isRead;
        });

        bookControlButtons.appendChild(removeBookButton);
        bookControlButtons.appendChild(changeReadStatusButton);
        bookContainer.appendChild(bookControlButtons);
        bookshelf.appendChild(bookContainer);
      }
    });
  }
}

const myLibrary = new Library();

let bookshelf = document.getElementById("bookshelf");

const addBookDialog = document.getElementById("add-book-dialog");
const showAddBookDialog = document.getElementById("open-add-book-dialog");
const closeAddBookDialog = document.getElementById("close-add-book-dialog");

showAddBookDialog.addEventListener("click", () => addBookDialog.showModal());
closeAddBookDialog.addEventListener("click", () => addBookDialog.close());

const form = document.getElementById("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);

  myLibrary.addNewBook(Object.fromEntries(formData));
  myLibrary.scanForBooks();
  addBookDialog.close();
});

const removeAllBooks = document.getElementById("clearLibrary");

removeAllBooks.addEventListener("click", () => {
  myLibrary.removeAllBooks();
  bookshelf.innerHTML = "";
});
