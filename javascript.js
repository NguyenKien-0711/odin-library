const addNewBookBtn = document.querySelector('.new-book');
const addNewBookForm = document.querySelector('.add-new-book-form');
const closeBtn = document.querySelector('.close-icon');
const submitBtn = document.querySelector('.submit-btn');
const bookName = document.querySelector('#name-book');
const authorBook = document.querySelector('#author-book');
const numberPages = document.querySelector('#number-pages');
const statusRead = document.querySelector('#read');
const statusNotYet = document.querySelector('#not-yet');
const input = document.querySelector('input');
const mainContent = document.querySelector('.main-content')
let myLibrary = [];
function Book(id, nameBook, author, numberPage, statusBook) {
    this.id = id;
    this.name = nameBook;
    this.author = author;
    this.numberPage = numberPage;
    this.statusBook = statusBook;
}
Book.prototype.toggleStatus = function () {
    if (this.statusBook === 'Read') this.statusBook = 'Not yet';
    else this.statusBook = 'Read';
};
function addBookToLibrary(id, nameBook, author, numberPage, statusBook) {
    let book = new Book(id, nameBook, author, numberPage, statusBook);
    myLibrary.push(book);
    return book;
}
function showBook(book) {
    let card = document.createElement("div");
    card.classList.add("card");

    let cardBookName = document.createElement("div");
    let cardAuthor = document.createElement("div");
    let cardNumberPages = document.createElement("div");
    let cardStatus = document.createElement("button");
    let removeBtn = document.createElement("button");

    cardBookName.classList.add("card-book-name");
    cardAuthor.classList.add("card-author");
    cardNumberPages.classList.add("card-number-pages");
    cardStatus.classList.add("card-status");
    removeBtn.classList.add("remove-btn");
    removeBookEvent = document.querySelector('.remove-btn');
    cardBookName.textContent = `Name of the book: ${book.name}`;
    cardAuthor.textContent = `Author: ${book.author}`;
    cardNumberPages.textContent = `Page Count: ${book.numberPage}`
    cardStatus.textContent = `Status: ${book.statusBook}`
    removeBtn.textContent = `Remove`;

    removeBtn.addEventListener('click', () => {
        console.log(book.id);
        myLibrary = myLibrary.filter(books => books.id !== book.id);
        card.remove();
    });
    cardStatus.addEventListener('click', () => {
        console.log(book.statusBook);
        book.toggleStatus();
        cardStatus.textContent = "Status: " + book.statusBook;
    });
    mainContent.appendChild(card);
    card.appendChild(cardBookName);
    card.appendChild(cardAuthor);
    card.appendChild(cardNumberPages);
    card.appendChild(cardStatus);
    card.appendChild(removeBtn);
}
function reset() {
    bookName.value = "";
    authorBook.value = "";
    numberPages.value = "";
    statusRead.checked = false;
    statusNotYet.checked = false;
    addNewBookForm.style.cssText = 'display: none;';
}
addNewBookBtn.addEventListener("click", () => {
    addNewBookForm.style.cssText = 'display: block;'
})
closeBtn.addEventListener("click", () => {
    addNewBookForm.style.cssText = 'display: none;'
})
submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (bookName.checkValidity() && authorBook.checkValidity() && numberPages.checkValidity() &&
        (statusNotYet.checked || statusRead.checked)) {
        let statusBook = '';
        if (statusRead.checked === true) statusBook = "Read";
        else statusBook = "Not yet";
        const id = crypto.randomUUID();
        let book = addBookToLibrary(id, bookName.value, authorBook.value, numberPages.value, statusBook);
        showBook(book);
        reset();
    }
    else {
        alert("Please fill up the form");
    }
})