import { allBooks } from "./data.js";

const bookContainer = document.querySelector(".book-grid");
const searchBar = document.querySelector(".search-bar");

console.log(allBooks);
searchBar.addEventListener("input", () => {
  const searchTerm = searchBar.value.toLowerCase();
  const filteredBooks = allBooks.filter((book) => {
    return (
      book.title.toLowerCase().includes(searchTerm) ||
      book.author.toLowerCase().includes(searchTerm) ||
      book.category.toLowerCase().includes(searchTerm)
    );
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
          <a href="./editBook.html?index=${index}" >
          <button>Edit</button>
            </a>
          <button class="delete">Delete</button>`;
    bookContainer.appendChild(book);
  });
  const deleteButtons = document.querySelectorAll(".delete");
  deleteButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      allBooks.splice(index, 1);
      bookContainer.innerHTML = ``;
      renderBooks(allBooks);
    });
  });
};

window.onload = renderBooks(allBooks);
