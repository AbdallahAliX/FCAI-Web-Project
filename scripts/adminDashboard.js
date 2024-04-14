import { allBooks } from "./data.js";

const bookContainer = document.querySelector(".book-grid");
const searchBar = document.querySelector(".search-bar");

console.log(allBooks);
searchBar.addEventListener("input", () => {
  const searchTerm = searchBar.value.toLowerCase();
  const filteredBooks = allBooks.filter((book) => {
    return book.title.toLowerCase().includes(searchTerm);
  });

  bookContainer.innerHTML = ``;
  renderBooks(filteredBooks);
});

const renderBooks = (allBooks) => {
  allBooks.map((data, index) => {
    const book = document.createElement("div");
    book.classList.add("book");
    book.innerHTML = `   
            <a href="./bookDescription.html?index=${index}" target="_blank">
              <img
                src="${data.image}"
                alt="${data.title}"
              />
            </a>
          </div>
          <p>${data.title}</p>
          <a href="./editBook.html?index=${index}" target="_blank">
          <button>Edit</button>
            </a>
          <button>Delete</button>`;
    bookContainer.appendChild(book);
  });
};

window.onload = renderBooks(allBooks);
