document.addEventListener('DOMContentLoaded', () => {
    const controller = new EventController();
    const library = new Library(controller);
    const form = new Form(controller);

    // form.isbn.value = 'AAAA-0001';
    // form.title.value = 'The Hobbit';
    // form.author.value = 'John Ronald Reuel Tolkien';
    // form.year.value = 1937;
    // form.addBookBtn.click();
    //
    // form.isbn.value = 'AAAA-0002';
    // form.title.value = 'The Invisible Man';
    // form.author.value = 'Herbert George Wells';
    // form.year.value = 1897;
    // form.addBookBtn.click();
    //
    // form.isbn.value = 'AAAA-0002';
    // form.title.value = 'Diamond Sutra';
    // form.author.value = '';
    // form.year.value = 868;
    // form.addBookBtn.click();
});