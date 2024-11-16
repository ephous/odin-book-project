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

function printBooksInLibraryToConsole(){
  myLibrary.forEach( x => console.log( x.info() ));
}

function displayBooksInLibrarySimpleText(){
  const library_container = document.querySelector('#library-container');
  myLibrary.forEach( x => {
    const div = document.createElement("div");
    div.textContent = x.info();
    div.style.color = "blue";
    library_container.appendChild(div);
  });
}

function createBookCard( book ){
    const card = document.createElement("div");
    card.className = 'book-card';

    //card.textContent = book.info();
    let arr = ['title','author','pages','read']
    arr.forEach( x => {
      let line = document.createElement("div");
      line.textContent = x.toUpperCase() + ': ' + book[x];
      //console.log(x, book[x]);
      card.appendChild(line);
    })

    return card;
}

function displayBooksInLibraryCards(){
    const library_container = document.querySelector('#library-container');
    myLibrary.forEach( x => {
      library_container.appendChild( createBookCard(x) );
    });
}

//===========================================
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog
// const dialog = document.querySelector("dialog");
// const showButton = document.querySelector("dialog + button");
// const closeButton = document.querySelector("dialog button");
const newbookForm = document.querySelector("#new-book-form");
const dialog = document.querySelector("#new-book-dialog");
const showButton = document.querySelector("#show-dialog");
//const confirmButton = dialog.querySelector("#confirm-button");
//const submitButton = dialog.querySelector("#submit-button");

// "Show the dialog" button opens the dialog modally
showButton.addEventListener("click", () => {
  dialog.showModal();
});

/*
// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
  dialog.close();
});
*/

// "Cancel" button closes the dialog without submitting because of [formmethod="dialog"], 
// triggering a close event.
dialog.addEventListener("close", (e) => {
  console.log("User closed dialog...");
  dialog.close(); // not needed in this example
});

/*
// Prevent the "confirm" button from the default behavior of submitting the form, and close the dialog with the `close()` method, which triggers the "close" event.
confirmButton.addEventListener("click", (event) => {
  event.preventDefault(); // We don't want to submit this fake form
  dialog.close(selectEl.value); // Have to send the select box value here.
});
*/

// https://www.freecodecamp.org/news/how-to-submit-a-form-with-javascript/
newbookForm.addEventListener("submit", (event) => {
  event.preventDefault(); // We don't want to submit this fake form
  let title = document.getElementById("book-title").value;
  let author = document.getElementById("book-author").value;
  let pages = document.getElementById("book-pages").value;
  let status = document.getElementById("book-read-status").checked;
  
  const newbook = new Book(title, author, pages, status);
  document.querySelector('#library-container').appendChild( createBookCard(newbook) );
  
  dialog.close();

  // not really needed here b/c no backend...
  addBookToLibrary(title, author, pages, status);
  printBooksInLibraryToConsole();

});
  


//===========================================
// unit test
printBooksInLibraryToConsole()
//displayBooksInLibrarySimpleText()
displayBooksInLibraryCards()