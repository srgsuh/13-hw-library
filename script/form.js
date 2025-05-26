const ACTIONS = {
    changeFocus: 'change-focus',
    delete: 'delete',
    add: 'add',
}

const IMG_TRASH = {
    src: '../img/trash.svg',
    alt: 'Delete book',
    action: ACTIONS.delete,
}
class Form {
    isbn;
    title;
    author;
    year;
    addBookBtn
    result;
    stats;
    focusable;
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
        this.focusable = [this.isbn, this.title, this.author, this.year];
        this._initForm();
    }

    _initForm() {
        //if (!this._checkValidForm()) return false;
        this.addBookBtn.addEventListener('click', () => this.addBookRequest());
        this.eventController.subscribe('add-book-success', (data) => this.addNewBook(data));
        this.eventController.subscribe('add-book-fail', (data) => this.rejectBook(data));
        this.eventController.subscribe('delete-book-success', (data) => this.deleteBookSuccess(data));

        this.result.addEventListener('click', (event) => this.onListClick(event));
        document.addEventListener('keydown', (event) => this.onEnterPress(event));

        this.isbn.dataset.action = ACTIONS.changeFocus;
        this.title.dataset.action = ACTIONS.changeFocus;
        this.author.dataset.action = ACTIONS.changeFocus;
        this.year.dataset.action = ACTIONS.add;
        this.actions.set(ACTIONS.delete,
            (element) => this.deleteBookRequest(element)
        );
        this.actions.set(ACTIONS.changeFocus, (element) => this.changeFocus(element));
        this.actions.set(ACTIONS.add, () => this.addBookRequest());

        return true;
    }

    setFocusOnStart() {
        this.isbn.focus();
    }

    rejectBook(errObj) {
        alert(errObj.message);
        this.setFocusOnStart();
    }

    addBookRequest() {
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
        return li;
    }

    addNewBook(changeObj) {
        const li = this.createListItem(changeObj);
        this.result.appendChild(li);
        this.clearInputs();
        this.updateStats(changeObj);
        this.setFocusOnStart();
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

    onEnterPress(event) {
        if (event.key !== 'Enter') {
            return;
        }
        const target = event.target;
        const action = target.dataset.action;
        if (action && this.actions.has(action)) {
            this.actions.get(action)(target);
        }
    }

    onListClick(event) {
        const action = event.target.dataset.action;
        if (action && this.actions.has(action)) {
            this.actions.get(action)(event.target);
        }
    }

    changeFocus(element) {
        const fIndex = this.focusable.indexOf(element);
        if (fIndex >= 0 && fIndex < this.focusable.length - 1) {
            this.focusable[fIndex + 1].focus();
        }
    }

    deleteBookRequest(element) {
        const isbn = element.closest('li')?.dataset?.isbn;
        if (isbn) {
            this.eventController.processEvent('delete-book-request', {isbn});
        }
    }

    deleteBookSuccess(data) {
        const isbn = data.isbn;
        const li = this.result.querySelector(`li[data-isbn="${isbn}"]`);
        if (li) {
            li.remove();
        }
        this.updateStats(data);
        this.setFocusOnStart();
    }
}