const myLibrary = [];

function Book(title, author, pages, isRead, id) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.id = id;
}

function addNewBook(title, author, pages, isRead) {
  if (isRead == "on") {
    myLibrary.push(new Book(title, author, pages, "Yes", crypto.randomUUID()));
  } else if (isRead == undefined) {
    myLibrary.push(new Book(title, author, pages, "No", crypto.randomUUID()));
  }
}

let bookshelf = document.getElementById("bookshelf");

function scanForBooks() {
  //bookshelf.innerHTML = "";
  myLibrary.forEach((book, index) => {
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
        let bookID = myLibrary
          .map((book) => book.id)
          .indexOf(
            event.target.parentElement.parentElement.getAttribute("data-id")
          );

        myLibrary.splice(bookID, 1);
        event.target.parentElement.parentElement.remove();
      });

      changeReadStatusButton.addEventListener("click", (event) => {
        let bookID = myLibrary
          .map((book) => book.id)
          .indexOf(
            event.target.parentElement.parentElement.getAttribute("data-id")
          );

        if (myLibrary[bookID].isRead == "No") myLibrary[bookID].isRead = "Yes";
        else if (myLibrary[bookID].isRead == "Yes")
          myLibrary[bookID].isRead = "No";
        event.target.parentElement.parentElement.querySelector(
          ".read-status"
        ).textContent = "Read: " + myLibrary[bookID].isRead;
      });

      bookControlButtons.appendChild(removeBookButton);
      bookControlButtons.appendChild(changeReadStatusButton);
      bookContainer.appendChild(bookControlButtons);
      bookshelf.appendChild(bookContainer);
    }
  });
}

scanForBooks();

const addBookDialog = document.getElementById("add-book-dialog");
const showAddBookDialog = document.getElementById("open-add-book-dialog");
const closeAddBookDialog = document.getElementById("close-add-book-dialog");

showAddBookDialog.addEventListener("click", () => addBookDialog.showModal());
closeAddBookDialog.addEventListener("click", () => addBookDialog.close());

const form = document.getElementById("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const formObject = Object.fromEntries(formData);

  addNewBook(
    formObject.title,
    formObject.author,
    formObject.pages,
    formObject.isRead
  );
  scanForBooks();
  addBookDialog.close();
});

const removeAllBooks = document.getElementById("clearLibrary");

removeAllBooks.addEventListener("click", () => {
  myLibrary.length = 0;
  bookshelf.innerHTML = "";
});
