const baseURL = "https://samuelalexkoshy2447146.github.io/WSD-Lab07/books.json";

var booklist = [];

document.addEventListener("DOMContentLoaded", async () => {
    await fetch(baseURL)
        .then((result) => result.json())
        .then((data) => {
            booklist = data;
        });
    for (let i = 0; i < Math.min(15, booklist.length); i++) {
        let newbook = document.createElement("div");
        newbook.className = "book";
        let title = document.createElement("div");
        title.className = "title";
        title.innerHTML = booklist[i].title;
        let author = document.createElement("div");
        author.innerHTML = booklist[i].author;
        author.className = "author";
        let descr = document.createElement("div");
        descr.innerHTML = booklist[i].description;
        let genre = document.createElement("div");
        genre.innerHTML = booklist[i].genre;
        genre.className = "genre";
        let pages = document.createElement("div");
        pages.innerHTML = `Pages: ${booklist[i].pages}`;
        newbook.appendChild(title);
        newbook.appendChild(descr);
        newbook.appendChild(author);
        newbook.appendChild(genre);
        newbook.appendChild(pages);
        document.getElementById("row").appendChild(newbook);
    }
});

function search() {}