function Book(isbn, title, author, year) {
    this.isbn = isbn;
    this.title = title;
    this.author = author;
    this.year = +year;
    this.toString = function () {
        return `ISBN:${this.isbn}; "${this.title}" by ${this.author}, ${this.year}`;
    }
    this.print = function() {
        console.log(this.toString());
    }
}
Book.of = function (inputStr) {
    return new Book(...inputStr.split(';').map(str => str.trim()));
}
function Library() {
    this._books = new Map();
    this.hasISBN = function(isbn) {
        return this._books.has(isbn);
    }
    this.addUniqueBook = function(book) {
        if (!book.isbn || this.hasISBN(book.isbn)) {
            return false;
        }
        this._books.set(book.isbn, book);
        return true;
    }
    this.forEach = function(callback) {
        this._books.values().forEach(callback);
    }
    this.print = function() {
        this.forEach(b => b.print());
    };
}
