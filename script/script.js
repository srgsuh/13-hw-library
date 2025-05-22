document.addEventListener('DOMContentLoaded', () => {
    const controller = new EventController();
    const library = new Library(controller);
    const form = new Form(controller);

    const success = form.initForm();
    if (!success) {
        throw new Error('Form initialization failed');
    }
    library.init();

    form.isbn.value = '8890-1234';
    form.title.value = 'The Hobbit';
    form.author.value = 'John Ronald Reuel Tolkien';
    form.year.value = '1937';
    form.addBookBtn.click();
});