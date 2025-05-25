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
    // form.isbn.value = 'AAAA-0003';
    // form.title.value = 'The Life and Strange Surprizing Adventures of Robinson Crusoe, of York, Mariner: Who lived Eight and Twenty Years, all alone in an un-inhabited Island on the Coast of America, near the Mouth of the Great River of Oroonoque; Having been cast on Shore by Shipwreck, wherein all the Men perished but himself. With An Account how he was at last as strangely deliver\'d by Pyrates. Written by Himself.';
    // form.author.value = 'Daniel Defoe';
    // form.year.value = 1719;
    // form.addBookBtn.click();
    //
    // form.isbn.value = 'AAAA-0002';
    // form.title.value = 'Diamond Sutra';
    // form.author.value = '';
    // form.year.value = 868;
    // form.addBookBtn.click();
});