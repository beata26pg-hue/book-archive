
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

const btnSubmit = document.getElementById("btnSubmit");
const btnCancel = document.getElementById("btnCancel");

btnCancel.hidden = true;


//Result count text
//All
const bookCountTotal = document.querySelectorAll(".count-total");
//Read
const bookCountRead = document.querySelectorAll(".count-read");
//Reading
const bookCountReading = document.querySelector(".count-reading");


let editingBookId = null;

//Labels
const genreLabels = {
    crime: "Krim",
    biografi: "Biografi",
    music: "Musikk",
    roman: "Roman",
    read: "Lest",
    wait: "Ikke lest",
    reading: "Leser nå",
};
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

//Get and display books
function renderBooks(books) {

    if (books.length === 0) {
        console.log("books", books.length);
        bookListContainer.innerHTML = `
            <p class="empty-message">
               Bruk skjema på venstre side for å registrere din første bok.
            </p> `;
        return;
    }
    bookListTable.innerHTML = "<tbody><tr><th>Tittel</th><th>Forfatter</th><th>Sjanger</th><th>Status</th><th>Pages</th><th></th><th></th></tr>";
    books.forEach(book => {

        bookListTable.innerHTML += `
           <tr data-id="${book.id}">
                <td class="title">${book.title}</td>
                <td class="author">${book.author}</td>
               <td><span class="label ${book.genre}">
                    ${genreLabels[book.genre]}
                </span></td>
                <td><span class="label ${book.status}">
                    ${genreLabels[book.status]}
                </span></td>
                <td class="pages">${book.pages} </td>
                 <td width="20"><button class="edit-btn" data-id="${book.id}">
                        <img src="./assets/images/icons/edit.svg" alt="rediger">
                    </button></td><td>
                  <button class="delete-btn" data-id="${book.id}">
                         <img src="./assets/images/icons/trash.svg" alt="slett">
                    </button></td>
            </tr>
        `;

    });
    bookListTable.innerHTML += "</tbody>";
    //count
    bookCountReading.textContent = books.filter(book => book.status === "reading").length;
    bookCountTotal.forEach(element => {
        element.textContent = books.length;
    });

    bookCountRead.forEach(element => {
        element.textContent = books.filter(book => book.status === "read").length;
    });

}
//Save book
function saveBooks() {

    try {
        localStorage.setItem("books", JSON.stringify(books));
    } catch (error) {
        console.error("Kunne ikke lagre bøker:", error);
    }

}
//Edit book and add current css classes
function editBook(id) {
    const book = books.find(book => book.id === id);

    if (!book) return;

    editingBookId = id;
    inputTitle.value = book.title;
    inputAuthor.value = book.author;
    inputPages.value = book.pages;
    selectGenre.value = book.genre;
    selectStatus.value = book.status;
    btnSubmit.textContent = "Oppdater bok";
    btnCancel.hidden = false;

    // Css classes for currently editing row
    document.querySelectorAll("#bookListTable tr").forEach(row => {
        row.classList.remove("editing");
    });

    const selectedRow = document.querySelector(
        `#bookListTable tr[data-id="${id}"]`
    );

    if (selectedRow) {
        selectedRow.classList.add("editing");
    }

    bookForm.scrollIntoView({
        behavior: "smooth"
    });

}
function deleteBook() {

}

function resetForm() {
    btnSubmit.textContent = "Legg til book";
    btnCancel.hidden = true;
    bookForm.reset();
    editingBookId = null;
    bookForm.classList.remove("editing-form");
    document.querySelectorAll(".editing").forEach(element => {
        element.classList.remove("editing");
    });
}

//Event listeners
bookForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const id = crypto.randomUUID();

    const bookData = {
        title: inputTitle.value.trim(),
        author: inputAuthor.value.trim(),
        genre: selectGenre.value.trim(),
        status: selectStatus.value.trim(),
        pages: inputPages.value.trim()
    };

    if (editingBookId !== null) {

        // Find existing bok
        const book = books.find(book => book.id === editingBookId);

        // Update existing bok
        book.title = bookData.title;
        book.author = bookData.author;
        book.genre = bookData.genre;
        book.status = bookData.status;
        book.pages = bookData.pages;

    } else {
        //create new bok
        const newBook = {
            id: id,
            ...bookData
        };
        books.push(newBook);
    }

    saveBooks();
    renderBooks(books);
    resetForm();

});
btnCancel.addEventListener("click", function () {
    resetForm();
});

// Edit btn click
bookListTable.addEventListener("click", function (event) {

    if (event.target.classList.contains("edit-btn")) {

        const id = event.target.dataset.id;
        editBook(id);
        bookForm.classList.add("editing-form");

    }

});

renderBooks(books);