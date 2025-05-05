const library = [];
//isbn;title;author;year
while (true){
    const inputData = prompt('Enter book data separate by ";"');
    if (!inputData){
        break;
    }
    const properties = inputData.split(';').map(str=>str.trim());
    if (properties[0] && 0 > findBook(library, properties[0])){
        library.push(new Book(...properties));
    }
}

printLibrary(library);

function printLibrary(library){
    console.log(`Library of ${library.length} books:`);
    library.forEach(book => console.log('    ', book.toString()));
}

function findBook(library, isbn){
    return library.findIndex(book => book.isbn === isbn);
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