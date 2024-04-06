const library = [];
const allGenres = ["classic", "science-fiction", "biography", "mistery", "fantasy", "historical", "horror", "romance", "other"];


// elements
// Popup form
const addBookBtn = document.querySelector('#addBook');
const addBookForm = document.querySelector('.add-book__pop-up');
const cancelBookForm = document.querySelector('#cancelBookForm');
// Table view (num rows & filters)
const table = document.querySelector('.main__table');
const genresFilter = document.querySelector('#filter-genre');
const isReadFilter = document.querySelector('#filter-ìsRead');
const numRowsFilter = document.querySelector('#filter-num-rows');


// event handlers
// Popup form
addBookBtn.addEventListener('click', togglePopupDisplay);
cancelBookForm.addEventListener('click', togglePopupDisplay); //Why does this refresh the page?
// Table view (num rows & filters)
numRowsFilter.addEventListener('change', displayNumRows);

// object constructor
function Book(title, author, pages, genres=[], isRead=false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.genres = genres;
    this.isRead = isRead;
}
// object methods
Book.prototype.toggleBookRead = function () {
    this.isRead ? this.isRead = false : this.isRead = true;
}

Book.prototype.toggleGenre = function (genre) {
    const idx = this.genres.indexOf(genre);
    this.genres.includes(genre) ? this.genres.splice(idx, 1) : this.genres.push(genre);
}


// UI logic
function displayNumRows() {

}
function togglePopupDisplay() {
    addBookForm.classList.toggle('popup-active');
}




// functions
function addBook(book) {
    library.push(book);
}

function removeBook(book) {
    const idx = library.indexOf(book);
    library.splice(idx, 1);
}


// filter functions
function filterBooksByGenre(genre) {
    return genre ? library.filter(book => book.genres.includes(genre)) : library;
}

function filterBooksByIsRead(isRead) {
    return library.filter(book => book.isRead === isRead);
}

function filterBooksByIndex(start, end) {
    return library.splice(start, end-start+1);
}

// sort functions
function sortBooksByTitle(direction) {
    return direction === 'ascending' ? library.sort((a, b) => a > b ? -1 : 1) : library.sort((a, b) => a > b ? 1 : -1);
}

// mock data
const books = [];
for (let i = 0; i < 500; i++) {
    const book = new Book(
        `Book title ${i}`,
        `Book title ${i}`,
        i,
        allGenres[Math.floor(Math.random() * allGenres.length)])
    addBook(book)
}

const page_view = 25;
let curr_page = 1;
let lastShowedIndex = 23

function createRow(book) {
    const html = `
        <div class="table-row">
            <div class="data-title">${book.title}</div>
            <div class="data-author">${book.author}</div>
            <div class="data-pages">${book.pages}</div>
            <div class="data-genres">${book.genres}</div>
            <div class="data-isRead"><span class="material-symbols-outlined">close</span></div>
            <div class="actions">
                <span class="material-symbols-outlined">edit</span>
                <span class="material-symbols-outlined">delete</span>
            </div>
        </div>`;
    const tableRow = document.createElement('div');
    tableRow.innerHTML = html;
    table.appendChild(tableRow);
}
for (let i = 0; i < 5; i++) {
    createRow(library[i])
}