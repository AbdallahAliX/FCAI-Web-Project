// import { allBooks } from "./data.js";

let allBooks = [];

let request = new XMLHttpRequest();
request.open("GET", "http://127.0.0.1:8000/books/");
request.responseType = "json";
request.send();

request.onload = function () {
  allBooks = request.response;
  const urlParams = new URLSearchParams(window.location.search);
  const bookIndex = urlParams.get("index");

  if (bookIndex !== null) {
    const selectedBook = allBooks.filter(
      (book) => book.id === parseInt(bookIndex)
    )[0];
    renderBookDetails(selectedBook);
  } else {
    console.error("No book index provided.");
  }
};

function renderBookDetails(book) {
  const bookDetailsContainer = document.querySelector(".book-description");
  bookDetailsContainer.innerHTML = `
    <div>
      <img src="${book.image}" alt="${book.title}" />
    </div>
    <div>
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Category:</strong> ${book.category}</p>
      <p><strong>Year:</strong> ${book.year}</p>
    </div>
  `;
}
