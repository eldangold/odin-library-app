const myLibrary = [];

function Book(title, author, pages, isRead, id) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.id = id;
}

function addNewBook(title, author, pages, isRead) {
  myLibrary.push(new Book(title, author, pages, isRead, crypto.randomUUID()));
}

addNewBook("Dummy Book", "Dummy Author", 295, "No");
addNewBook("Dummy Book 2", "Dummy Author 2", 255, "Yes");
addNewBook("Dummy Book 3", "Dummy Author 3", 295, "No");
addNewBook("Dummy Book 3", "Dummy Author 4", 255, "Yes");

console.log(
  myLibrary.forEach((book) => {
    console.log(book);
  })
);

let bookshelf = document.getElementById("main-container");

myLibrary.forEach((book, index) => {
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
});
