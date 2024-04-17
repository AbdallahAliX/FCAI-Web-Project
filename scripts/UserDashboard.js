import { userBooks } from "./data.js";

const bookContainer = document.querySelector(".book-grid");
const searchBar = document.querySelector(".search-bar");

searchBar.addEventListener("input", () => {
  const searchTerm = searchBar.value.toLowerCase();
  const filteredBooks = userBooks.filter((book) => {
    return book.name.toLowerCase().includes(searchTerm);
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
    // const returnButton = book.querySelector(".return-button");
    // returnButton.addEventListener("click", () => returnBook(data.name));
  });
};

// const returnBook = (name) => {
//   const conf = confirm("Are you sure you want to return this book ?");
//   if (conf) {
//     const userBooksFiltered = userBooks.filter((book) => book.name !== name);
//     bookContainer.innerHTML = "";
//     console.log(userBooks);
//     renderBooks(userBooksFiltered);
//     alert("Book returned successfully");
//   }
// };

window.onload = renderBooks(userBooks);
