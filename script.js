const library = new Library();
while (true) {
    //isbn;title;author;year
    const inputStr = prompt('Enter book data (format ISBN;Title;Author;YYYY)):');
    if (!inputStr){
        break;
    }
    library.addUniqueBook(Book.of(inputStr));
}
// library.addUniqueBook(new Book('0001', 'Cat\'s Cradle', 'Kurt Vonnegut', 1963));
// library.addUniqueBook(new Book('1984', 'Nineteen Eighty-Four', 'George Orwell', 1949));
// library.addUniqueBook(new Book('0001', 'We', 'Eugene Zamiatin', 1924));
// library.addUniqueBook(new Book('0002', 'Brave New World', 'Aldous Huxley', 1932));
// library.print();

const ol = document.createElement('ol');
library.forEach((book) => {
    const li = document.createElement('li');
    const text = document.createTextNode(book);
    li.appendChild(text);
    ol.appendChild(li);
});
document.body.appendChild(ol);