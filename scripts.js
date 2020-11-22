
const openModal = document.querySelector(".open-modal");
const overlay = document.getElementById("overlay");
const bookModal = document.querySelector(".book-modal");
const closeModal = document.querySelector(".modal-close");
const addBookButton = document.getElementById("add-book");
const booksGrid = document.querySelector(".books-grid");

let booksArray = [];
let ratesArray = [];
let id = 0;
let storage = window.localStorage;

getLocalStorage(storage);
render(booksArray);

/* INPUTS */

const bookTitle = document.querySelector(".book-title-modal");
const avatarAuthor = document.querySelector(".book-avatar-modal");
const bookAuthor = document.querySelector(".book-author-modal");
const bookPages = document.querySelector(".book-pages-modal");

/* ERROR INPUTS */

const bookTitleError = document.getElementById("error-title")
const bookAuthorError = document.getElementById("error-author")
const bookPagesError = document.getElementById("error-pages")

/* CONSTRUCTOR */

function Book(id, title, author, img, pages, readed, rating) {
    this.id = id
    this.title = title;
    this.author = author;
    this.img = img;
    this.pages = pages;
    this.readed = readed;
    this.rating = rating;
}

openModal.addEventListener("click", () => toggleModal());
closeModal.addEventListener("click", () => toggleModal());

addBookButton.addEventListener("click", () => {
    addBook(bookTitle.value, bookAuthor.value, avatarAuthor.value, parseInt(bookPages.value));
});


function toggleModal() {
    if (overlay.className === "active" && bookModal.className === "book-modal active") {
        document.getElementById("modal-form").reset();
        overlay.classList.remove("active");
        bookModal.classList.remove("active");
    } else {
        overlay.classList.add("active");
        bookModal.classList.add("active");
    }

}

function addBook(title, author, img, pages) {
    if (validateForm()) {
        id = checkId(booksArray);

        let book = new Book(id, title, author, img, pages, false, 0);

        booksArray.push(book);
        storage.setItem(book.id, JSON.stringify(book));

        toggleModal();
        render(booksArray);
    }
}

// Check if any ID is repeated and if so increment it
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

// Get local storage and push all content to booksArray
function getLocalStorage(storage) {
    let storageLength = Object.keys(storage);
    let i = storageLength.length;

    while (i--) {
        if (storage.getItem(storageLength[i]) != null) {
            booksArray.push(JSON.parse(storage.getItem(storageLength[i])));
        }
    }
}

// Clear all elements from screen to render the array from 0
function clearScreen() {

    while (booksGrid.firstChild) {
        booksGrid.removeChild(booksGrid.firstChild);
    }
}

// Check if image extension is equal to jpg, png or jpeg
function validateImage(element, avatarAuthor) {

    if (
        element.img.slice(-3).toLowerCase() === "jpg" ||
        element.img.slice(-3).toLowerCase() === "png" ||
        element.img.slice(-4).toLowerCase() === "jpeg") {
        avatarAuthor.setAttribute("style", `background: url('${element.img}');background-size:cover;`);
    }
}

// Update local storage removing the item and setting again with updated attributes
function updateStorage(element) {

    storage.removeItem(element.id);
    storage.setItem(element.id, JSON.stringify(element));
}

// check if element is read or not and show information
function checkRead(element, readTick, readContent) {

    if (element.readed) {
        readTick.setAttribute("style", "background: url('images/readed.png');background-size:cover;")
        readContent.textContent = "Already readed";
    } else {
        readTick.setAttribute("style", "background: url('images/not-readed.png');background-size:cover;");
        readContent.textContent = "Isn't read yet";
    }

}

function setRating(element, event) {
    let nodeRating = event.target.parentNode.firstChild;
    let nodeRatingAux = event.target.parentNode.firstChild;
    for (let j = 0; j < 5; j++) {
        if (nodeRatingAux.className === "ratingUp") {
            nodeRatingAux.classList.remove("ratingUp");
            nodeRatingAux.classList.add("ratingDown");
        }
        nodeRatingAux = nodeRatingAux.nextSibling;
    }
    let x = event.target.id;

    for (let i = 0; i < x; i++) {
        nodeRating.classList.remove("ratingDown");
        nodeRating.classList.add("ratingUp");
        nodeRating = nodeRating.nextSibling;
    }
    element.rating = x;
    updateStorage(element);
}

function validateForm() {

    if (bookTitle.value.length <= 1) {
        bookTitleError.innerHTML = "Please enter a valid title"
        return false;
    } else {
        bookTitleError.innerHTML = "";
    }

    if (bookAuthor.value.length <= 1) {
        bookAuthorError.innerHTML = "Please enter a valid author"
        return false;
    } else {
        bookAuthorError.innerHTML = "";
    }

    if (bookPages.value < 1 || bookPages.value.indexOf(".") != -1) {
        bookPagesError.innerHTML = "Please enter a valid number of pages"
        return false;
    } else {
        bookPagesError.innerHTML = "";
    }

    if (bookTitle.value.length > 1 && bookAuthor.value.length > 1 && bookPages.value > 0 && bookPages.value.indexOf(".") == -1) {
        return true;
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

        validateImage(element, avatarAuthor);

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


        checkRead(element, bookReadTick, bookReaded)

        bookReadTick.addEventListener("click", function () {
            if (element.readed == false) {
                element.readed = true;
            } else {
                element.readed = false;
            }
            checkRead(element, bookReadTick, bookReaded)
            updateStorage(element);
        })

        let bookRating = document.createElement("p");
        bookRating.classList.add("book-rating");
        bookInfo.appendChild(bookRating);

        for (let i = 1; i < 6; i++) {
            rate = document.createElement("img");
            rate.classList.add("ratingDown");
            rate.setAttribute("id", i);
            rate.src = "images/blank.gif";
            bookRating.appendChild(rate);
            ratesArray.push(rate);

            rate.addEventListener("click", function (event) {
                setRating(element, event);
            })

        }

        // Draw book's rating
        if (element.rating > 0) {
            for (let j = 0; j < element.rating; j++) {
                ratesArray[j].classList.remove("ratingDown");
                ratesArray[j].classList.add("ratingUp");
            }
        }

        ratesArray = [];

    })

}

