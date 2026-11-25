//Search box 
const searchInput = document.getElementById("searchInput");
const bookList = document.getElementById("bookListTable");

//Ddl sort filter

const filterCat = document.getElementById("filterCat");
const filterStatus = document.getElementById("filterStatus");
const filterSort = document.getElementById("filterSort");


// filter and search function 
function filterBooks() {
    const searchText = searchInput.value.toLowerCase().trim();

    const filteredBooks = books.filter(book => {

        const matchesSearch =
            book.title.toLowerCase().includes(searchText) ||
            book.author.toLowerCase().includes(searchText)

        const matchesStatus =
            filterStatus.value === "all" ||
            book.status.toLowerCase() === filterStatus.value.trim().toLowerCase();
        const matchesCat =
            filterCat.value === "all" ||
            book.genre.toLowerCase() === filterCat.value.trim().toLowerCase();

        return matchesSearch && (matchesStatus & matchesCat);
    });

    console.log(books, "books")
    console.log(filterCat.value, "filteredBooks")
    // JS arrow function for sortering
    switch (filterSort.value) {
        case "a-z":
            filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case "z-a":
            filteredBooks.sort((a, b) => b.title.localeCompare(a.title));
            break;
        case "pages-desc":
            filteredBooks.sort((a, b) => b.pages - a.pages);
            break;
        case "pages-asc":
            filteredBooks.sort((a, b) => a.pages - b.pages);
            break;
    }
    renderBooks(filteredBooks);
}



// Seach filter
searchInput.addEventListener("input", filterBooks);


filterSort.addEventListener("change", filterBooks);
filterStatus.addEventListener("change", filterBooks);
filterCat.addEventListener("change", filterBooks);

// Get and dispaly books
renderBooks(books);



