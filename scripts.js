
const openModal = document.querySelector(".open-modal");
const overlay = document.getElementById("overlay");
const bookModal = document.querySelector(".book-modal");
const modalClose = document.querySelector(".modal-close");
const addBookButton = document.getElementById("add-book");
const booksGrid = document.querySelector(".books-grid");

let booksArray = [];

/* render(booksArray); */

/* INPUTS */

const bookTitle = document.querySelector(".book-title-modal");
const bookAuthor = document.querySelector(".book-author-modal");
const bookPages = document.querySelector(".book-pages-modal");

/* CONSTRUCTOR */

function Book(title, author, pages, readed) {
    this.title = title;
    this.author = author;
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
    addBook(bookTitle.value, bookAuthor.value, parseInt(bookPages.value));
});

function clearForm() {
    bookTitle.value = "";
    bookAuthor.value = "";
    bookPages.value = "";
}

function closeModal() {
    overlay.classList.remove("active");
    bookModal.classList.remove("active");
}

function addBook(title, author, pages) {
    if (title.length > 0 && author.length > 0 && pages >= 0) {
        let book = new Book(title, author, pages, true);
        booksArray.push(book);

        clearForm();
        closeModal();
        render(booksArray);
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
            render(booksArray);
        })

        let bookImg = document.createElement("img");
        bookImg.classList.add("book-img");
        bookHeader.appendChild(bookImg);
        

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

        if(element.readed) {
            bookReadTick.setAttribute("style", "background: url('images/readed.png');background-size:cover;")
            bookReaded.textContent = "Readed";
        }else {
            bookReadTick.setAttribute("style", "background: url('images/not-readed.png');background-size:cover;");
            bookReaded.textContent = "Not readed";
        }

        bookReadTick.addEventListener("click", function() {
            if(element.readed == false) {
                element.readed = true;
                bookReadTick.setAttribute("style", "background: url('images/readed.png');background-size:cover;");
                bookReaded.textContent = "Readed";
            } else {
                element.readed = false;
                bookReadTick.setAttribute("style", "background: url('images/not-readed.png');background-size:cover;");
                bookReaded.textContent = "Not readed";
            }
        })

    })
}

