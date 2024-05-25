let allBooks = [];
let currentuser = [];

let request = new XMLHttpRequest();
request.open("GET", "http://127.0.0.1:8000/books/");
request.responseType = "json";
request.send();

request.onload = function () {
  allBooks = request.response;
  renderBooks(allBooks);
};

let userRequest = new XMLHttpRequest();
userRequest.open("GET", "http://127.0.0.1:8000/currentuser/");
userRequest.responseType = "json";
userRequest.send();

userRequest.onload = function () {
  currentuser = userRequest.response;
};

const bookContainer = document.querySelector(".book-grid");
const searchBar = document.querySelector(".search-bar");

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

const rentBook = (bookId) => {
  const requestBody = {
    user_id: currentuser.user.id, // Assuming user ID is 2
    book_id: bookId,
  };

  const request = new XMLHttpRequest();
  request.open("POST", "http://127.0.0.1:8000/borrowedbooks/");
  request.setRequestHeader("Content-Type", "application/json");
  request.onload = function () {
    if (request.status >= 200 && request.status < 300) {
      alert("Book rented successfully!");
      // Optionally, you can update the UI or display a message indicating success
    } else {
      alert("You already rented this book!");
      // Handle errors if needed
    }
  };
  request.onerror = function () {
    console.error("Request failed");
    // Handle errors if needed
  };
  request.send(JSON.stringify(requestBody));
};

const renderBooks = (books) => {
  books.forEach((data) => {
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
          <button class="rent-button" data-book-id="${data.id}">Rent</button>`;
    bookContainer.appendChild(book);
  });

  const rentButtons = document.querySelectorAll(".rent-button");
  rentButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const bookId = button.getAttribute("data-book-id");
      rentBook(bookId);
    });
  });
};
