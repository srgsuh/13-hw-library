const library = [];
//isbn;title;author;year
let inputData = prompt('Enter book data separate by ";"');
while (inputData){
    // TODO add to library only unique book
    inputData = prompt('Enter book data separate by ";"');
}

printLibrary(library);

function printLibrary(library){
    // TODO print all  books to console
}

function findBook(library, isbn){
    // TODO return index if book with isbn exists and -1 otherwise
}

function Book(isbn, title, author, year) {
    this.isbn = isbn;
    this.title = title;
    this.author = author;
    this.year = +year;
    this.toString = function () {
        return `ISBN: ${this.isbn}, Title: ${this.title}, Author: ${this.author}, Year of publishing: ${this.year}`;
    }
}