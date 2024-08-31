const baseURL = "https://samuelalexkoshy2447146.github.io/WSD-Lab07/books.json";

let booklist = [];
let page = 1;
let books = [];

document.addEventListener("DOMContentLoaded", async () => {
    await fetch(baseURL)
        .then((result) => result.json())
        .then((data) => {
            booklist = data;
        });
    page = 1;
    books = booklist;
    displayBooks();
});

function displayBooks() {
    document.getElementById("row").innerHTML = "";
    start = (page - 1) * 15;
    stop = page * 15;
    for (let i = start; i < Math.min(stop, books.length); i++) {
        let newbook = document.createElement("div");
        newbook.className = "book";
        let title = document.createElement("div");
        title.className = "title";
        title.innerHTML = books[i].title;
        let author = document.createElement("div");
        author.innerHTML = books[i].author;
        author.className = "author";
        let descr = document.createElement("div");
        descr.innerHTML = books[i].description;
        let genre = document.createElement("div");
        genre.innerHTML = books[i].genre;
        genre.className = "genre";
        let pages = document.createElement("div");
        pages.innerHTML = `Pages: ${books[i].pages}`;
        newbook.appendChild(title);
        newbook.appendChild(descr);
        newbook.appendChild(author);
        newbook.appendChild(genre);
        newbook.appendChild(pages);
        document.getElementById("row").appendChild(newbook);
    }
    prevPage = document.getElementById("prevPage").disabled = page === 1;
    nextPage = document.getElementById("nextPage").disabled =
        books.length <= stop;
}

function changePage(index) {
    page = page + index;
    displayBooks();
}

function search() {
    const titleQuery = document.getElementById("title").value.toLowerCase();
    const authorQuery = document.getElementById("author").value.toLowerCase();
    const genreQuery = document.getElementById("genre").value.toLowerCase();
    const pagesQuery = document.getElementById("pages").value;
    const sortCriteria = document.getElementById("sortCriteria").value;

    const filteredBooks = booklist.filter(
        (book) =>
            (titleQuery === "" ||
                book.title.toLowerCase().includes(titleQuery)) &&
            (authorQuery === "" ||
                book.author.toLowerCase().includes(authorQuery)) &&
            (genreQuery === "" ||
                book.genre.toLowerCase().includes(genreQuery)) &&
            (pagesQuery === "" || book.pages >= pagesQuery)
    );
    if (sortCriteria) {
        filteredBooks.sort((a, b) => {
            if (typeof a[sortCriteria] === "string") {
                return a[sortCriteria].localeCompare(b[sortCriteria]);
            } else if (typeof a[sortCriteria] === "number") {
                return a[sortCriteria] - b[sortCriteria];
            }
            return 0;
        });
    }
    page = 1;
    books = filteredBooks;
    displayBooks();
}
