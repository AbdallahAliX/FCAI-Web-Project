// import { allBooks } from "./data.js";

// const bookContainer = document.querySelector(".book-grid");
// const searchBar = document.querySelector(".search-bar");

// console.log(allBooks);
// searchBar.addEventListener("input", () => {
//   const searchTerm = searchBar.value.toLowerCase();
//   const filteredBooks = allBooks.filter((book) => {
//     return (
//       book.title.toLowerCase().includes(searchTerm) ||
//       book.author.toLowerCase().includes(searchTerm) ||
//       book.category.toLowerCase().includes(searchTerm)
//     );
//   });

//   bookContainer.innerHTML = ``;
//   renderBooks(filteredBooks);
// });

// const renderBooks = (allBooks) => {
//   allBooks.map((data, index) => {
//     const book = document.createElement("div");
//     book.classList.add("book");
//     book.innerHTML = `
//               <img
//                 src="${data.image}"
//                 alt="${data.title}"
//               />

//           <p>${data.title}</p>
//           <a href="./editBook.html?index=${index}" >
//           <button>Edit</button>
//             </a>
//           <button class="delete">Delete</button>`;
//     bookContainer.appendChild(book);
//   });
//   const deleteButtons = document.querySelectorAll(".delete");
//   deleteButtons.forEach((button, index) => {
//     button.addEventListener("click", () => {
//       allBooks.splice(index, 1);
//       bookContainer.innerHTML = ``;
//       renderBooks(allBooks);
//     });
//   });
// };

// window.onload = renderBooks(allBooks);

let allBooks = [];

const bookContainer = document.querySelector(".book-grid");
const searchBar = document.querySelector(".search-bar");

const fetchBooks = () => {
  const request = new XMLHttpRequest();
  request.open("GET", "http://127.0.0.1:8000/books/");
  request.responseType = "json";
  request.send();

  request.onload = function () {
    if (request.status >= 200 && request.status < 300) {
      allBooks = request.response;
      renderBooks(allBooks);
    } else {
      console.error("Failed to fetch books:", request.statusText);
    }
  };

  request.onerror = function () {
    console.error("Request failed");
  };
};

fetchBooks();

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

const renderBooks = (books) => {
  bookContainer.innerHTML = ""; // Clear the container before rendering
  books.map((data) => {
    const book = document.createElement("div");
    book.classList.add("book");
    book.innerHTML = `   
          <a href="./bookDescription.html?index=${data.id}" target="_blank">
            <img
              src="${data.image}"
              alt="${data.title}"
            />
          </a>
            
          <p>${data.title}</p>
          <a href="./editBook.html?id=${data.id}" >
          <button>Edit</button>
            </a>
          <button class="delete" data-book-id="${data.id}">Delete</button>`;
    bookContainer.appendChild(book);
  });

  const deleteButtons = document.querySelectorAll(".delete");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const bookId = button.getAttribute("data-book-id");
      deleteBook(bookId);
    });
  });
};

const deleteBook = (bookId) => {
  const request = new XMLHttpRequest();
  request.open("DELETE", `http://127.0.0.1:8000/books/${bookId}`);
  request.onload = function () {
    if (request.status >= 200 && request.status < 300) {
      allBooks = allBooks.filter((book) => book.id !== parseInt(bookId));
      renderBooks(allBooks);
    } else {
      console.error("Failed to delete book:", request.statusText);
    }
  };
  request.onerror = function () {
    console.error("Request failed");
  };
  request.send();
};
