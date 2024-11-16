const myLibrary = [];

// https://www.theodinproject.com/lessons/node-path-javascript-objects-and-object-constructors#object-constructors
// book constructor
function Book(title, author, pages, read = false) {
  this.title = title,
  this.author = author,
  this.pages = pages,
  this.read =  read
  this.uuid = self.crypto.randomUUID(); // https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID

  this.info = function(){
    let status = this.read ? "this book has been read" : "this book has not been read yet"
    return `"${this.title}" by ${this.author}, ${this.pages} pages, ${status}`;
  }

  this.toggleStatus = function(){
    this.read = !this.read;
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
      line.className = x;
      line.textContent = x.toUpperCase() + ': ' + book[x];
      card.appendChild(line);
    })

    // add button to toggle status
    let statusButton = document.createElement("button");
    statusButton.className = 'book-remove';
    statusButton.textContent = book.read ? "Mark as Unread" : "Mark as Read";
    statusButton.setAttribute("data-book-uuid", book.uuid );
    card.appendChild(statusButton);
    statusButton.addEventListener("click", (e) => {
      toggleBookStatus(e.target) });
    

    // add button to remove book
    let removeButton = document.createElement("button");
    removeButton.className = 'book-remove';
    removeButton.textContent = "Remove Book";
    removeButton.setAttribute("data-book-uuid", book.uuid );
    card.appendChild(removeButton);
    removeButton.addEventListener("click", (e) => {
      removeBook(e.target) });
    
    return card;
}

function refreshBookCard( card, book ){
    let arr = ['title','author','pages','read']
    arr.forEach( x => {
      let line = (card.getElementsByClassName(x))[0]; // because getElementsByClassName returns HTMLCollection
      line.textContent = x.toUpperCase() + ': ' + book[x];
      
      if (x.toLowerCase()=='read'){
        let statusButton = card.getElementsByClassName('book-remove')[0]; 
        statusButton.textContent = book.read ? "Mark as Unread" : "Mark as Read";
      }

    })
}

function toggleBookStatus(button){
    const uuid = button.getAttribute("data-book-uuid");
    const index = myLibrary.findIndex( x => x.uuid==uuid);
    if (index > -1) {
      myLibrary[index].toggleStatus();
      refreshBookCard(button.parentNode, myLibrary[index]);
    }
}

function removeBook(button){
  const uuid = button.getAttribute("data-book-uuid");
  const index = myLibrary.findIndex( x => x.uuid==uuid);
  if (index > -1) {
    // second param means remove one item only
    myLibrary.splice(index, 1);
    
    // and then remove the card...
    const library_container = document.querySelector('#library-container');
    library_container.removeChild(button.parentNode);
    
    printBooksInLibraryToConsole();
    
  }
}

function displayBooksInLibraryCards(){
    const library_container = document.querySelector('#library-container');
    myLibrary.forEach( x => {
      library_container.appendChild( createBookCard(x) );
    });
}

//===========================================
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog
const newbookForm = document.querySelector("#new-book-form");
const dialog = document.querySelector("#new-book-dialog");
const showButton = document.querySelector("#show-dialog");

// "Show the dialog" button opens the dialog modally
showButton.addEventListener("click", () => {
  dialog.showModal();
});


// "Cancel" button closes the dialog without submitting because of [formmethod="dialog"], 
// triggering a close event.
dialog.addEventListener("close", (e) => {
  dialog.close(); // not needed in this example
});


// https://www.freecodecamp.org/news/how-to-submit-a-form-with-javascript/
newbookForm.addEventListener("submit", (event) => {
  
  event.preventDefault(); // We don't want to submit this fake form
  
  let title = document.getElementById("book-title").value;
  let author = document.getElementById("book-author").value;
  let pages = document.getElementById("book-pages").value;
  let status = document.getElementById("book-read-status").checked;
  const newbook = new Book(title, author, pages, status);
  myLibrary.push(newbook);
  
  document.querySelector('#library-container').appendChild( createBookCard(newbook) );
  
  dialog.close();

  //addBookToLibrary(title, author, pages, status);
  printBooksInLibraryToConsole();

});
  


//===========================================
// unit test
printBooksInLibraryToConsole()
//displayBooksInLibrarySimpleText()
displayBooksInLibraryCards()