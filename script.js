const myLibrary = [];

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

function addNewBook(title, author, pages, isRead) {
  myLibrary.push(new Book(title, author, pages, isRead));
}

addNewBook("Dummy Book", "Dummy Author", 295, "No");
addNewBook("Dummy Book 2", "Dummy Author 2", 255, "Yes");

console.log(
  myLibrary.forEach((book) => {
    console.log(book);
  })
);
