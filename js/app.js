
//HTML-elementer
const bookForm = document.getElementById("bookForm");
const inputTitle = document.getElementById("title");
const inputAuthor = document.getElementById("author");
const inputPages = document.getElementById("pages");
const selectGenre = document.getElementById("genre");
const selectStatus = document.getElementById("status");

const bookListContainer = document.getElementById("bookListDiv");
const bookListTable = document.getElementById("bookListTable");

const bookCount = document.getElementById("bookCount");

const submitCancelBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("btnCancel");


//Get books
let books = getBooks();

//Funcions

function getBooks() {

    try {
        const booksFromLocalStorage = localStorage.getItem("books");

        if (!booksFromLocalStorage) {
            return [];
        }
        const parsedBooks = JSON.parse(booksFromLocalStorage);
        return Array.isArray(parsedBooks) ? parsedBooks : [];

    } catch (error) {

        console.error("Det har skjedd en feil:", error);
        return [];

    }
}

//get and display books
function renderBooks() {
    console.log("books", books.length);

    if (books.length === 0) {

        bookListContainer.innerHTML = `
            <p class="empty-message">
               Bruk skjema på venstre side for å registrere din første bok.
            </p> `;
        return;
    }


    bookListTable.innerHTML = "<tr><th>Tittel</th><th>Forfatter</th><th>Sjanger</th><th>Status</th><th>Pages</th><th></th><th></th></tr>";

    books.forEach(book => {

        bookListTable.innerHTML += `
            <tr>
                <td class="title">${book.title}</td>
                <td class="author">${book.author}</td>
                <td class="genre">${book.genre}</td>
                <td class="status">${book.status} </td>
                <td class="pages">${book.pages} </td>
                <td>Rediger</td>
                <td>Slett</td>
            </tr>
        `;

    });
}

bookForm.addEventListener("submit", function (event) {

    event.preventDefault();
    const id = crypto.randomUUID()

    const bookData = {
        title: inputTitle.value.trim(),
        author: inputAuthor.value.trim(),
        genre: selectGenre.selectedOptions[0].textContent.trim(),
        status: selectStatus.selectedOptions[0].textContent.trim(),
        pages: inputPages.value.trim()
    };

    const newBook = {
        id: id,
        ...bookData

    };

    books.push(newBook);

    saveBooks();
    renderBooks();
    resetForm();

});
cancelBtn.addEventListener("click", function () {
    resetForm();
});


function saveBooks() {

    try {
        localStorage.setItem("books", JSON.stringify(books));
    } catch (error) {
        console.error("Kunne ikke lagre bøker:", error);
    }

}

function editBook() {

}
function deleteBook() {

}

function resetForm() {

    bookForm.reset();
    cancelBtn.hidden = true;

}


renderBooks();