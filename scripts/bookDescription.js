import { allBooks } from "./data.js";

const urlParams = new URLSearchParams(window.location.search);
const bookIndex = urlParams.get("index");

if (bookIndex !== null) {
  const selectedBook = allBooks[bookIndex];
  renderBookDetails(selectedBook);
} else {
  console.error("No book index provided.");
}

function renderBookDetails(book) {
  const bookDetailsContainer = document.querySelector(".book-description");
  bookDetailsContainer.innerHTML = `
    <div>
      <img src="${book.image}" alt="${book.title}" />
    </div>
    <div>
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Year:</strong> ${book.year}</p>
    </div>
  `;
}
