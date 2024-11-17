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
function initializeLibrary(){
  addBookToLibrary('The Hobbit', 'J.R.R Tolkien', 295, false);
  addBookToLibrary('The Red Badge of Courage', 'Stephen Crane', 88, true);
  addBookToLibrary('To Kill a Mockingbird', 'Harper Lee', 336, true);
  addBookToLibrary('Brave New World', 'Aldous Huxley', 288, true);
  addBookToLibrary('Flowers for Algernon', 'Daniel Keyes', 274, true);
  addBookToLibrary('The Grapes of Wrath', 'John Steinbeck', 464, false);
  addBookToLibrary('Fahrenheit 451', 'Ray Bradbury', 256, true);
  addBookToLibrary('The Scarlet Letter', 'Nathaniel Hawthorne', 272, true);
  addBookToLibrary('Nineteen Eighty-Four', 'George Orwell', 328, false);
  addBookToLibrary('Animal Farm', 'George Orwell', 176, true);
}

function printBooksInLibraryToConsole(){
}

function createBookEntry( book ){
    const div = document.createElement("div");
    div.className = 'book-entry';
    div.textContent = book.info();
    div.style.color = "blue";
    return div;
}

function displayBooksInLibrarySimpleText(){
  // adding a div to library container (where the child div will contain the entries)
  // so that flex in CSS will not be applied to the entries...
  const library_container = document.querySelector('#library-container');
  const div = document.createElement("div");  
  library_container.appendChild(div);   
  myLibrary.forEach( x => {
    div.appendChild( createBookEntry(x) );
  });
}

// https://codepen.io/Nice2MeatU/pen/dqmypX
function trashCanSvg(){
  return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>'
}

function bookReadSvg(){
  return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>' 
}

function bookNotReadSvg(){
  return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-circle"><circle cx="12" cy="12" r="10"></circle></svg>'
}

function createBookCard( book ){
    const card = document.createElement("div");
    card.className = 'book-card';
    
    //card.textContent = book.info();
    let arr = ['title','author','pages']; //,'read']
    arr.forEach( x => {
      let line = document.createElement("div");
      line.className = x;
      //line.textContent = x.toUpperCase() + ': ' + book[x];
      if(x=='pages'){
        line.textContent = ` ${book[x]} pages`;
      } else {
        line.textContent = book[x];
      }
      card.appendChild(line);
    })

    // button base
    let buttonBase = document.createElement("div");
    buttonBase.className = 'book-card-button-base';
    card.appendChild(buttonBase);

    // add button to toggle status
    let statusButton = document.createElement("button");
    statusButton.className = 'book-card-button read-button';
    //statusButton.textContent = book.read ? "Mark as Unread" : "Mark as Read";
    statusButton.innerHTML = book.read ? bookReadSvg() : bookNotReadSvg();
    statusButton.title = book.read ? 'Mark book as "not read"' : 'Mark book as "read"';
    statusButton.setAttribute("data-book-uuid", book.uuid );
    buttonBase.appendChild(statusButton);
    statusButton.addEventListener("click", (e) => {
      toggleBookStatus(e.target) });
    

    // add button to remove book
    let removeButton = document.createElement("button");
    removeButton.className = 'book-card-button delete-button';
    removeButton.innerHTML = trashCanSvg(); //"Remove Book";
    removeButton.title = 'Remove Book';
    removeButton.setAttribute("data-book-uuid", book.uuid );
    buttonBase.appendChild(removeButton);
    removeButton.addEventListener("click", (e) => {
      removeBook(e.target) });
    
    return card;
}

function refreshBookCard( card, book ){
    let arr = ['title','author','pages']; //,'read']
    arr.forEach( x => {
      let line = (card.getElementsByClassName(x))[0]; // because getElementsByClassName returns HTMLCollection
      //line.textContent = x.toUpperCase() + ': ' + book[x];
      if(x=='pages'){
        line.textContent = ` ${book[x]} pages`;
      } else {
        line.textContent = book[x];
      }
    })

    let statusButton = card.getElementsByClassName('book-card-button read-button')[0]; 
    statusButton.innerHTML = book.read ? bookReadSvg() : bookNotReadSvg();
    statusButton.title = book.read ? 'Mark book as "not read"' : 'Mark book as "read"';

}

function toggleBookStatus(button){
    const uuid = button.getAttribute("data-book-uuid");
    const index = myLibrary.findIndex( x => x.uuid==uuid);
    if (index > -1) {
      myLibrary[index].toggleStatus();
      const buttonBase = button.parentNode;
      refreshBookCard(buttonBase.parentNode, myLibrary[index]);
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
    const buttonBase = button.parentNode;
    library_container.removeChild(buttonBase.parentNode);
    
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

function resetFormFields(){
  
  const title = document.getElementById("new-book-title");
  const author = document.getElementById("new-book-author");
  const pages = document.getElementById("new-book-pages");
  const status = document.getElementById("new-book-read-status");
  
  title.value='';
  author.value='';
  pages.value=1;
  status.checked = false;
   
}


// "Cancel" button closes the dialog without submitting because of [formmethod="dialog"], 
// triggering a close event.
dialog.addEventListener("close", (e) => {
  resetFormFields();
  dialog.close(); // not needed in this example
});


// https://www.freecodecamp.org/news/how-to-submit-a-form-with-javascript/
newbookForm.addEventListener("submit", (event) => {
  
  event.preventDefault(); // We don't want to submit this fake form
  
  //TODO: is this the correct way to do this?
  if (event.submitter.value=='cancel'){
    dialog.close();
    return;
  }

  let title = document.getElementById("new-book-title").value;
  let author = document.getElementById("new-book-author").value;
  let pages = document.getElementById("new-book-pages").value;
  let status = document.getElementById("new-book-read-status").checked;
  const newbook = new Book(title, author, pages, status);
  myLibrary.push(newbook);
  
  if (DISPLAY){
    document.querySelector('#library-container').appendChild( createBookCard(newbook) );
  } else {
    // remember that library-container has a child div that the lines of text are added to
    document.querySelector('#library-container').children[0].appendChild( createBookEntry(newbook) );
  }
  dialog.close();

  //addBookToLibrary(title, author, pages, status);
  printBooksInLibraryToConsole();

});

//==========================================
document.querySelector("#mark-all-read").addEventListener("click", (event)=>{
  
  // [1] mark all library elements as true (no need to match cards w/ entires here)
  myLibrary.forEach( x => x.read = true);

  // [2] update all cards to point to "checked" svg
  const container = document.querySelector("#library-container");
  if (DISPLAY){
    Array.from(container.children).forEach(card => {
      let statusButton = card.getElementsByClassName('book-card-button read-button')[0]; 
      statusButton.innerHTML = bookReadSvg();
      statusButton.title = 'Mark book as "not read"';
    })
  } else {
    let child = container.lastElementChild;
    while (child) {
      container.removeChild(child);
      child = container.lastElementChild;
    }
    displayBooksInLibrarySimpleText();    
  }

})

document.querySelector("#mark-all-unread").addEventListener("click", (event)=>{
  
  // [1] mark all library elements as true (no need to match cards w/ entires here)
  myLibrary.forEach( x => x.read = false);

  // [2] update all cards to point to "checked" svg
  const container = document.querySelector("#library-container");
  if (DISPLAY){
    Array.from(container.children).forEach(card => {
      let statusButton = card.getElementsByClassName('book-card-button read-button')[0]; 
      statusButton.innerHTML = bookNotReadSvg();
      statusButton.title = 'Mark book as "read"';
    })
  } else {
    let child = container.lastElementChild;
    while (child) {
      container.removeChild(child);
      child = container.lastElementChild;
    }
    displayBooksInLibrarySimpleText();
  }

})


//==========================================
const toggleDisplay = document.querySelector("#toggle-display");
toggleDisplay.addEventListener("click", (event)=>{
  
  // https://www.geeksforgeeks.org/remove-all-the-child-elements-of-a-dom-node-in-javascript/
  const container = document.querySelector("#library-container");
  let child = container.lastElementChild;
  while (child) {
    container.removeChild(child);
    child = container.lastElementChild;
  }

  if (DISPLAY){
    DISPLAY=0;
    displayBooksInLibrarySimpleText();
  } else {
    DISPLAY=1;
    displayBooksInLibraryCards();    
  }
})

//===========================================
// unit test
initializeLibrary()
printBooksInLibraryToConsole()

var DISPLAY=1;
if (DISPLAY){
  displayBooksInLibraryCards();
} else {
  displayBooksInLibrarySimpleText();
}
