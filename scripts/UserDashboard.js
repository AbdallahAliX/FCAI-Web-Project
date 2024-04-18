import { userBooks } from "./data.js";

const bookContainer = document.querySelector(".book-grid");
const searchBar = document.querySelector(".search-bar");

searchBar.addEventListener("input", () => {
  const searchTerm = searchBar.value.toLowerCase();
  const filteredBooks = userBooks.filter((book) => {
    return (
      book.title.toLowerCase().includes(searchTerm) ||
      book.author.toLowerCase().includes(searchTerm) ||
      book.category.toLowerCase().includes(searchTerm)
    );
  });

  bookContainer.innerHTML = ``;

  renderBooks(filteredBooks);
});

const renderBooks = (userBooks) => {
  userBooks.map((data, index) => {
    const book = document.createElement("div");
    book.classList.add("book");
    book.innerHTML = `
                        
                          <a href="./bookDescription.html?index=${index}" target="_blank">
                            <img src="${data.image}" alt="${data.name}" />
                          </a>
                        
                        <p>${data.name}</p>
                        <button class="return-button">Return</button>`;
    bookContainer.appendChild(book);
  });

  const returnButtons = document.querySelectorAll(".return-button");
  returnButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      userBooks.splice(index, 1);
      bookContainer.innerHTML = ``;
      renderBooks(userBooks);
    });
  });
};

window.onload = renderBooks(userBooks);
