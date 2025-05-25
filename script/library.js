const MIN_YEAR = 1445;
const MAX_YEAR = new Date().getFullYear();
class Book{
    constructor(isbn, title, author, year) {
        this.isbn = isbn;
        this.title = title;
        this.author = author;
        this.year = +year;
    }
}

class Library {
    _books;
    _eventController;
    constructor(eventController) {
        this._books = new Map();
        this._eventController = eventController;
        this._init();
    }

    _init() {
        this._eventController.subscribe('add-book-request', (data) => this.addUniqueBook(data));
        this._eventController.subscribe('delete-book-request', (data) => this.deleteBook(data));
        return true;
    }

    _validateBookData({isbn, title, author, year}) {
        const errors = []
        if (!isbn) {
            errors.push('ISBN is required');
        }
        else {
            if (this.hasISBN(isbn)) {
                errors.push('ISBN already exists');
            }
        }

        if (!title) {
            errors.push('Title is required');
        }

        if (!author) {
            errors.push('Author is required');
        }

        if (!year) {
            errors.push('Year is required');
        }
        else {
            if (year < MIN_YEAR || year > MAX_YEAR) {
                errors.push(`Year must be between ${MIN_YEAR} and ${MAX_YEAR}`);
            }
        }
        if (errors.length === 0) {
            return {valid: true, message: ''};
        }
        return {valid: false, message: errors.join(',\n')}
    }

    hasISBN(isbn) {
        return this._books.has(isbn);
    }
    addUniqueBook (bookData) {
        const validationResult = this._validateBookData(bookData);
        if (!validationResult.valid) {
            this._eventController.processEvent('add-book-fail', validationResult);
            return false;
        }
        const book = new Book(bookData.isbn, bookData.title, bookData.author, bookData.year);
        this._books.set(bookData.isbn, book);
        const reply = Object.assign({}, bookData, this.getStatistics());
        this._eventController.processEvent('add-book-success', reply);
        return true;
    }

    deleteBook({isbn}) {
        if (!this.hasISBN(isbn)) {
            return false;
        }
        this._books.delete(isbn);
        const reply = Object.assign({isbn}, this.getStatistics());
        this._eventController.processEvent('delete-book-success', reply);
        return true;
    }

    getStatistics() {
        if (this._books.size === 0) {
            return {
                booksCount: 0,
                minYear: null,
                maxYear: null,
            }
        }
        return {
            booksCount: this._books.size,
            minYear: [...this._books.values()].reduce((min, book) => Math.min(min, book.year), MAX_YEAR),
            maxYear: [...this._books.values()].reduce((max, book) => Math.max(max, book.year), MIN_YEAR),
        }
    }
}
