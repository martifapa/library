// data structures
function Library(books=[], genres=[]) {
    this.books = books;
    this.genres = genres;
}

Library.prototype.addBook = function(book) {
    this.books.push(book);
}

Library.prototype.removeBook = function(book) {
    const idx = this.books.indexOf(book);
    this.books.splice(idx, 1);
}

Library.prototype.filterBooksByColumnName = function(columnName=false, value=false) {
    return value ? this.books.filter(book => book[columnName].includes(value)) : this.books;
}

Library.prototype.filterBooksByIndex = function(start, end) {
    return this.books.slice(start, end-start+1);
}

Library.prototype.sortBooksByColumnName = function(direction, field) {
    return direction === 'ascending' ? this.books.sort((a, b) => a[field] > b[field] ? -1 : 1) : this.books.sort((a, b) => a[field] > b[field] ? 1 : -1);
}


function Book(title, author, pages, genres=[], isRead=false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.genres = genres;
    this.isRead = isRead;
}

Book.prototype.toggleBookRead = function () {
    return this.isRead ? this.isRead = false : this.isRead = true;
}

Book.prototype.toggleGenre = function (genre) {
    const idx = this.genres.indexOf(genre);
    this.genres.includes(genre) ? this.genres.splice(idx, 1) : this.genres.push(genre);
}



// variables
const library = new Library();
const allGenres = ["classic", "science-fiction", "biography", "mistery", "fantasy", "historical", "horror", "romance", "other"];
let rowsPerPage = 25;
let currentPages = 1;
let currentPageNum = 0;
let currentFilter = '';
let currentBooksSelection = library.filterBooksByColumnName();



// elements
// Popup form
const addBookBtn = document.querySelector('#addBook');
const addBookForm = document.querySelector('.add-book__pop-up');
const cancelBookFormBtn = document.querySelector('#cancelBookForm');
const submitBookFormBtn = document.querySelector('#submitBookForm');
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const genresInput = document.querySelector('#add-genres');
const pagesInput = document.querySelector('#numPages');
const readInput = document.querySelector('#isRead');
const formInputs = [titleInput, authorInput, genresInput, pagesInput, readInput];
// Table view (num rows & filters)
const table = document.querySelector('.main__table');
const tableContent = document.querySelector('.table-content');
const genresFilter = document.querySelector('#filter-genres');
const isReadFilter = document.querySelector('#filter-isRead');
const numRowsFilter = document.querySelector('#filter-num-rows');
const nextPageButton = document.querySelector('#next-page');
const previousPageButton = document.querySelector('#previous-page');



// event listeners
addBookBtn.addEventListener('click', togglePopupDisplay);
submitBookFormBtn.addEventListener('click', fetchFormData);
cancelBookFormBtn.addEventListener('click', togglePopupDisplay);
numRowsFilter.addEventListener('change', setRowsPerPage);
isReadFilter.addEventListener('change', filterBooks);
genresFilter.addEventListener('change', filterBooks);
nextPageButton.addEventListener('click', goToNPage);
previousPageButton.addEventListener('click', goToNPage);



// UI logic
function updateScreen() {
    tableContent.textContent = "";
    const displayedBooks = getDisplayedBooks();
    for (let book of displayedBooks) {
        createRow(book);
    }
}

function createRow(book) {
    const html = `
            <div class="data-title">${book.title}</div>
            <div class="data-author">${book.author}</div>
            <div class="data-pages">${book.pages}</div>
            <div class="data-genres">${book.genres}</div>
            <div class="data-isRead"><span class="material-symbols-outlined" onClick="toggleIsRead(this)">close</span></div>
            <div class="actions">
                <span class="material-symbols-outlined">edit</span>
                <span class="material-symbols-outlined" data-title="${book.title}" onClick="deleteRow(this)">delete</span>
            </div>`;
    const tableRow = document.createElement('div');
    tableRow.classList.add('table-row');
    tableRow.innerHTML = html;
    tableContent.appendChild(tableRow);
}

function deleteRow(btn) {
    const bookTitle = btn.dataset.title;
    library.removeBook(library.books.find(book => book.title === bookTitle));
    updateScreen();
}

function toggleIsRead(btn) {
    const row = btn.closest('.table-row');
    const isReadCell = row.querySelector('.data-isRead>span');

    const bookTitle = row.querySelector('.data-title').textContent;
    const book = library.books.find(book => book.title === bookTitle);

    book.toggleBookRead() ? isReadCell.textContent = 'check' : isReadCell.textContent = 'close';
}

function sortBooks() {}

function filterBooks(e) {
    const columnName = e.target.id.replace('filter-', '');
    currentBooksSelection = library.filterBooksByColumnName(columnName, e.target.value);
    updateScreen();
}

function setRowsPerPage(btn) {
    rowsPerPage = parseInt(btn.target.value);
    currentPages = Math.ceil(currentBooksSelection.length / rowsPerPage)

    updateScreen();
}

function getDisplayedBooks() {
    return currentBooksSelection.slice(rowsPerPage*currentPageNum, (rowsPerPage*currentPageNum) + rowsPerPage);
}

function goToNPage(btn) {
    const direction = btn.target.textContent;
    direction == 'Next' ? currentPageNum++ : currentPageNum--;
    updateScreen();
}

function togglePopupDisplay() {
    addBookForm.classList.toggle('popup-active');
    cancelBookForm();
}

function fetchFormData() {
    const newBook = new Book(
        titleInput.value,
        authorInput.value,
        parseInt(pagesInput.value),
        genresInput.value,
        readInput.checked
        )
        
    library.addBook(newBook);
    togglePopupDisplay();
    updateDisplayedBooks();
}
    
function cancelBookForm() {
    for (let input of formInputs) {
        input.value = '';
    }
}



// initialize mock books
for (let i = 1; i < 60; i++) {
    const newBook = new Book(
        `Title ${i}`,
        `Author ${i}`,
        i,
        allGenres[Math.floor(Math.random() * allGenres.length)]
    )
    
    library.addBook(newBook);
}

updateScreen()

for (let genre of allGenres) {
    const option = document.createElement('option');
    option.value = genre;
    const capitalizedOption = genre.charAt(0).toUpperCase() + genre.slice(1);
    option.textContent = capitalizedOption;
    genresFilter.appendChild(option);
}