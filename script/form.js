const IMG_TRASH = {
    src: '../img/trash.svg',
    alt: 'Delete book',
    action: 'delete',
}
class Form {
    isbn;
    title;
    author;
    year;
    addBookBtn
    result;
    stats;
    eventController;
    actions;

    constructor(eventController) {
        this.eventController = eventController;
        this.isbn = document.getElementById('isbn');
        this.title = document.getElementById('title');
        this.author = document.getElementById('author');
        this.year = document.getElementById('year');
        this.addBookBtn = document.getElementById('add-book');
        this.result = document.getElementById('result');
        this.stats = document.getElementById('stats');
        this.actions = new Map();
        this._initForm();
    }

    _initForm() {
        //if (!this._checkValidForm()) return false;
        this.addBookBtn.addEventListener('click', () => this.addBookPressed());
        this.eventController.subscribe('add-book-success', (data) => this.addNewBook(data));
        this.eventController.subscribe('add-book-fail', (data) => this.rejectBook(data));
        this.eventController.subscribe('delete-book-success', (data) => this.deleteBookSuccess(data));

        this.actions.set('delete', (delRequestObj) => this.eventController.processEvent('delete-book-request', delRequestObj));

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

    createIconButton({src, alt}) {
        const img = document.createElement('img');
        img.src = src;
        img.alt = img.title = alt;
        img.classList.add('icon-button');
        img.dataset.action = 'delete';
        return img;
    }

    createLibraryItemText(changeObj) {
        const span = document.createElement('span');
        span.appendChild(document.createTextNode(this.dataToStr(changeObj)));
        span.classList.add('library-item-text');
        return span;
    }

    createLibraryItem(changeObj) {
        const div = document.createElement('div');
        div.classList.add('library-item');
        div.appendChild(this.createLibraryItemText(changeObj));
        div.appendChild(this.createIconButton(IMG_TRASH));
        return div;
    }

    createListItem(changeObj) {
        const li = document.createElement('li');
        li.appendChild(this.createLibraryItem(changeObj));
        li.dataset.isbn = changeObj.isbn;
        li.addEventListener('click', (event) => this.deleteBookClick(event));
        return li;
    }

    addNewBook(changeObj) {
        const li = this.createListItem(changeObj);
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
        const stats = this.stats;
        let statList = stats.querySelector('ul');
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

    deleteBookClick(event) {
        const li = event.target.closest('li');
        if (!li) return;
        const action = event.target.dataset.action;
        const isbn = li.dataset.isbn;
        if (action && isbn && this.actions.has(action)) {
            this.actions.get(action)({isbn});
        }
    }

    deleteBookSuccess(data) {
        const isbn = data.isbn;
        const li = this.result.querySelector(`li[data-isbn="${isbn}"]`);
        if (li) {
            li.remove();
        }
        this.updateStats(data);
    }
}