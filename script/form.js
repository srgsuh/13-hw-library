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
        this.addBookBtn = document.getElementById('add-book');
        this.result = document.getElementById('result');
        this.stats = document.getElementById('stats');
        for (let key in this) {
            console.log(key, this[key]);
        }
    }

    initForm() {
        //if (!this._checkValidForm()) return false;
        this.addBookBtn.addEventListener('click', () => this.addBookPressed());
        this.eventController.subscribe('add-book-success', (data) => this.addNewBook(data));
        this.eventController.subscribe('add-book-fail', (data) => this.rejectBook(data));
        return true;
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

    dataToStr(obj) {
        return `"${obj.title}" by ${obj.author}, ${obj.year}. ISBN: ${obj.isbn}`;
    }

    addNewBook(changeObj) {
        console.log('addNewBook', changeObj);
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(this.dataToStr(changeObj)));
        li.id = `book-id-${changeObj.isbn}`;
        this.result.appendChild(li);
        this.clearInputs();
        this.updateStats(changeObj);
    }

    clearInputs() {
        this.isbn.value = '';
        this.title.value = '';
        this.author.value = '';
        this.year.value = '';
    }

    createStatsLine(text) {
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(text));
        return li;
    }

    updateStats(changeObj) {
        console.log('updateStats changeObj:', changeObj);
        const stats = this.stats;
        let statList = stats.querySelector('ul');
        console.log('updateStats statList:', statList);
        if (statList) {
            statList.remove();
        }
        if (changeObj && changeObj.booksCount > 0) {
            statList = document.createElement('ul');
            statList.appendChild(this.createStatsLine(`Books count: ${changeObj.booksCount}`));
            statList.appendChild(this.createStatsLine(`Min year: ${changeObj.minYear}`));
            statList.appendChild(this.createStatsLine(`Max year: ${changeObj.maxYear}`));
            stats.appendChild(statList);
        }
    }
}