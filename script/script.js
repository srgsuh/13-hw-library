document.addEventListener('DOMContentLoaded', () => {
    const controller = new EventController();
    const library = new Library(controller);
    const form = new Form(controller);

    const success = form.initForm();
    if (!success) {
        throw new Error('Form initialization failed');
    }
    library.init();
});