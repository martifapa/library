const library = [];
const categories = ["classic", "science-fiction", "biography", "mistery", "fantasy", "historical", "horror", "romance", "other"];


// object constructor
function Book(title, author, pages, categories=[], isRead=false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.categories = categories;
    this.isRead = isRead;
}


// object methods
Book.prototype.toggleBookRead = function () {
    this.isRead ? this.isRead = false : this.isRead = true;
}

Book.prototype.toggleCategory = function (category) {
    const idx = this.categories.indexOf(category);
    this.categories.includes(category) ? this.categories.splice(idx, 1) : this.categories.push(category);
}


// functions
function addBook(book) {
    library.push(book);
}

function removeBook(book) {
    const idx = library.indexOf(book);
    library.splice(idx, 1);
}



