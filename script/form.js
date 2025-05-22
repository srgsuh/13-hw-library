class Form {
    isbn;
    title;
    author;
    year;
    addBookBtn
    result;
    stats;
    eventController;

    constructor(eventController) {
        this.eventController = eventController;
        this.isbn = document.getElementById('isbn');
        this.title = document.getElementById('title');
        this.author = document.getElementById('author');
        this.year = document.getElementById('year');
        this.addBookBtn = document.getElementById('addBookBtn');
        this.result = document.getElementById('result');
        this.stats = document.getElementById('stats');
    }

    _checkValidForm() {
        const fieldArray =[];
        for (const key in this) {
            fieldArray.push([key, this[key]]);
        }
        const errStr = fieldArray.filter((_, element) => !element)
            .map((id, _) => `element id = ${id} is not found`)
            .join(', ');
        if (!errStr) {
            return true;
        }
        const errMsg = `There were errors while loading the DOM: ${errStr}.`;
        alert(errMsg);
        console.log(errMsg);

        return false;
    }
    initForm() {
        if (!this._checkValidForm()) return;
        this.addBookBtn.addEventListener('click', () => this.addBookPressed());
        this.eventController.subscribe('add-book-success', () => this.addNewBook());
        this.eventController.subscribe('add-book-error', (errObj) => this.rejectBook(errObj));
    }

    rejectBook(errObj) {
        alert(errObj.message);
    }

    addBookPressed() {
        const bookData = {
            isbn: this.isbn.value,
            title: this.title.value,
            author: this.author.value,
            year: this.year.value,
        }
        this.eventController.processEvent('add-book-request', bookData);
    }

    addNewBook(changeObj) {
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(dataToStr(changeObj)));
        li.id = `book-id-${changeObj.isbn}`;
        this.result.appendChild(li);
        this.clearInputs();
        this.updateStats(changeObj);

        function dataToStr(obj) {
            return `${obj.title} by ${obj.author}, ${obj.year}. ISBN: ${obj.isbn}`;
        }
    }

    clearInputs() {
        this.isbn.value = '';
        this.title.value = '';
        this.author.value = '';
        this.year.value = '';
    }

    updateStats(changeObj) {

    }
}