const myLibrary = [];

// https://www.theodinproject.com/lessons/node-path-javascript-objects-and-object-constructors#object-constructors
// book constructor
function Book(title, author, pages, read = false) {
  this.title = title,
  this.author = author,
  this.pages = pages,
  this.read =  read

  this.info = function(){
    let status = this.read ? "this book has been read" : "this book has not been read yet"
    return `"${this.title}" by ${this.author}, ${this.pages} pages, ${status}`;
  }

}

// using rest operator for signature of addBookTOLibrary
// using spread operator for passing args to Book() constructor 
function addBookToLibrary(...args) {
  const newBook = new Book(...args);
  myLibrary.push(newBook);
}

// initialize library with some books
addBookToLibrary('The Hobbit', 'J.R.R Tolkien', 295, false);
addBookToLibrary('The Red Badge of Courage', 'Stephen Crane', 88, true);
addBookToLibrary('To Kill a Mockingbird', 'Harper Lee', 336, true);
addBookToLibrary('Brave New World', 'Aldous Huxley', 288, true);
addBookToLibrary('Flowers for Algernon', 'Daniel Keyes', 274, true);
addBookToLibrary('The Grapes of Wrath', 'John Steinbeck', 464, true);
addBookToLibrary('Fahrenheit 451', 'Ray Bradbury', 256, true);
addBookToLibrary('The Scarlet Letter', 'Nathaniel Hawthorne', 272, true);
addBookToLibrary('Nineteen Eighty-Four', 'George Orwell', 328, false);
addBookToLibrary('Animal Farm', 'George Orwell', 176, true);

function displayBooksInLibrary(){
  myLibrary.forEach( x => console.log( x.info() ));
}

// unit test
displayBooksInLibrary()