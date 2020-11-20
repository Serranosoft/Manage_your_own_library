
const openModal = document.querySelector(".open-modal");
const overlay = document.getElementById("overlay");
const bookModal = document.querySelector(".book-modal");
const modalClose = document.querySelector(".modal-close");
const addBookButton = document.getElementById("add-book");
const booksGrid = document.querySelector(".books-grid");

let booksArray = [];
let id = 0;
let storage = window.localStorage;

getStorage(storage);
render(booksArray);

/* INPUTS */

const bookTitle = document.querySelector(".book-title-modal");
const avatarAuthor = document.querySelector(".book-avatar-modal");
const bookAuthor = document.querySelector(".book-author-modal");
const bookPages = document.querySelector(".book-pages-modal");


/* CONSTRUCTOR */

function Book(id, title, author, img, pages, readed) {
    this.id = id
    this.title = title;
    this.author = author;
    this.img = img;
    this.pages = pages;
    this.readed = readed;
}

/* EVENTS */

openModal.addEventListener("click", function () {
    overlay.classList.add("active");
    bookModal.classList.add("active");
})

modalClose.addEventListener("click", function () {
    clearForm();
    closeModal();

})

addBookButton.addEventListener("click", function () {
    addBook(bookTitle.value, bookAuthor.value, avatarAuthor.value, parseInt(bookPages.value));
});

function clearForm() {
    bookTitle.value = "";
    bookAuthor.value = "";
    avatarAuthor.value = "";
    bookPages.value = "";
}

function closeModal() {
    overlay.classList.remove("active");
    bookModal.classList.remove("active");
}

function addBook(title, author, img, pages) {
    if (title.length > 0 && author.length > 0 && pages >= 0) {
        id = checkId(booksArray);

        let book = new Book(id, title, author, img, pages, false);

        booksArray.push(book);
        storage.setItem(book.id, JSON.stringify(book));

        clearForm();
        closeModal();
        render(booksArray);
    }
}

function checkId(booksArray) {
    if (booksArray.length < 1) {
        id = 0;
    } else {
        booksArray.forEach(element => {
            if (element.id == id) {
                id++
            }
        });
    }

    return id;
}

function getStorage(storage) {
    for (let index = 0; index <= storage.length; index++) {
        if (storage.getItem(index) != null) {
            booksArray.push(JSON.parse(storage.getItem(index)));
        }

    }
}

function clearScreen() {

    while (booksGrid.firstChild) {
        booksGrid.removeChild(booksGrid.firstChild);
    }
}

function render(booksArray) {

    clearScreen();

    booksArray.forEach(element => {

        let book = document.createElement("div");
        book.classList.add("book");
        booksGrid.appendChild(book);

        let bookHeader = document.createElement("div");
        bookHeader.classList.add("book-header");
        book.appendChild(bookHeader);

        let bookReadTick = document.createElement("img");
        bookReadTick.classList.add("book-read-tick");
        bookHeader.appendChild(bookReadTick);

        let bookDelete = document.createElement("span");
        bookDelete.innerHTML = "&times"
        bookDelete.classList.add("book-delete");
        bookHeader.appendChild(bookDelete);


        bookDelete.addEventListener("click", function () {
            booksArray.splice(booksArray.indexOf(element), 1);
            storage.removeItem(element.id);
            render(booksArray);
        })

        let avatarAuthor = document.createElement("img");
        avatarAuthor.classList.add("book-img");

        // Check if extension of img is jpg or png
        if (element.img.slice(-3).toLowerCase() == "jpg" || element.img.slice(-3).toLowerCase() == "png") {
            avatarAuthor.setAttribute("style", `background: url('${element.img}');background-size:cover;`);
        }

        bookHeader.appendChild(avatarAuthor);


        let bookTitle = document.createElement("p");
        bookTitle.textContent = element.title;
        bookTitle.classList.add("book-title");
        bookHeader.appendChild(bookTitle);

        let bookAuthor = document.createElement("p");
        bookAuthor.textContent = element.author;
        bookAuthor.classList.add("book-author");
        bookHeader.appendChild(bookAuthor);

        let bookInfo = document.createElement("div");
        bookInfo.classList.add("book-info");
        book.appendChild(bookInfo);

        let bookPages = document.createElement("p");
        bookPages.textContent = element.pages + " pages";
        bookPages.classList.add("book-pages");
        bookInfo.appendChild(bookPages);

        let bookReaded = document.createElement("p");
        bookReaded.classList.add("book-readed");
        bookInfo.appendChild(bookReaded);

        if (element.readed) {
            bookReadTick.setAttribute("style", "background: url('images/readed.png');background-size:cover;")
            bookReaded.textContent = "Readed";
        } else {
            bookReadTick.setAttribute("style", "background: url('images/not-readed.png');background-size:cover;");
            bookReaded.textContent = "Not readed";
        }

        bookReadTick.addEventListener("click", function () {
            if (element.readed == false) {
                element.readed = true;
                bookReadTick.setAttribute("style", "background: url('images/readed.png');background-size:cover;");
                bookReaded.textContent = "Readed";

                /* UPDATE IN LOCAL STORAGE */
                storage.removeItem(element.id);
                storage.setItem(element.id, JSON.stringify(element));
                console.log(JSON.parse(storage.getItem(element.id)));


            } else {
                element.readed = false;
                bookReadTick.setAttribute("style", "background: url('images/not-readed.png');background-size:cover;");
                bookReaded.textContent = "Not readed";

                /* UPDATE IN LOCAL STORAGE */
                storage.removeItem(element.id);
                storage.setItem(element.id, JSON.stringify(element));
                console.log(JSON.parse(storage.getItem(element.id)));
            }
        })

    })
}

