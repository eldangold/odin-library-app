const myLibrary = [];
let updatedLibrary = [];

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
  updatedLibrary.forEach((book, index) => {
    let bookContainer = document.createElement("div");
    bookContainer.classList.add("book-container");

    let bookData = document.createElement("p");

    bookData.innerHTML =
      "<p>" +
      "Author: " +
      book.author +
      "</p>" +
      "<p>" +
      "Pages: " +
      book.pages +
      "</p>" +
      "<p>" +
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
    bookshelf.appendChild(bookContainer);
    updatedLibrary.splice(index, 1);
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
  updatedLibrary = myLibrary;
  scanForBooks();
  addBookDialog.close();
});
