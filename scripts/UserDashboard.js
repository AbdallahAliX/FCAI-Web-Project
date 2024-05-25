// let userBooks = []; // Define userBooks globally to make it accessible across functions

// const fetchUserBooks = () => {
//   const request = new XMLHttpRequest();
//   request.open("GET", "http://127.0.0.1:8000/borrowedbooks/?user_id=2");
//   request.responseType = "json";
//   request.send();

//   request.onload = function () {
//     userBooks = request.response;
//     renderBooks(userBooks);
//   };
// };

// fetchUserBooks(); // Fetch user books when the script loads

// const bookContainer = document.querySelector(".book-grid");
// const searchBar = document.querySelector(".search-bar");

// searchBar.addEventListener("input", () => {
//   const searchTerm = searchBar.value.toLowerCase();
//   const filteredBooks = userBooks.filter((borrowedBook) => {
//     const bookDetails = borrowedBook.book;
//     return (
//       bookDetails.title.toLowerCase().includes(searchTerm) ||
//       bookDetails.author.toLowerCase().includes(searchTerm) ||
//       bookDetails.category.toLowerCase().includes(searchTerm)
//     );
//   });

//   bookContainer.innerHTML = ``;
//   renderBooks(filteredBooks);
// });

// const returnBook = (borrowedBookId) => {
//   const requestBody = {
//     user_id: 2, // Assuming user ID is 2
//     book_id: borrowedBookId,
//   };

//   const request = new XMLHttpRequest();
//   request.open(
//     "DELETE",
//     `http://127.0.0.1:8000/borrowedbooks/?user_id=${requestBody.user_id}&book_id=${requestBody.book_id}`
//   );
//   request.onload = function () {
//     if (request.status >= 200 && request.status < 300) {
//       // alert("Book returned successfully!");
//       // After successful deletion, we will also remove the returned book from the UI
//       const index = userBooks.findIndex(
//         (book) => book.id === parseInt(borrowedBookId)
//       );
//       userBooks.splice(index, 1);
//       renderBooks(userBooks);
//     } else {
//       console.error("Failed to return the book:", request.statusText);
//       // Handle errors if needed
//     }
//   };
//   request.onerror = function () {
//     console.error("Request failed");
//     // Handle errors if needed
//   };
//   request.send();
// };

// const renderBooks = (userBooks) => {
//   // Clear the existing book container before rendering
//   bookContainer.innerHTML = "";

//   userBooks.forEach((borrowedBook, index) => {
//     const bookDetails = borrowedBook.book;
//     const book = document.createElement("div");
//     book.classList.add("book");
//     book.innerHTML = `

//                           <a href="./bookDescription.html?index=${index}" target="_blank">
//                             <img src="${bookDetails.image}" alt="${bookDetails.title}" />
//                           </a>

//                         <p>${bookDetails.title}</p>
//                         <button class="return-button" data-borrowed-book-id="${borrowedBook.book.id}">Return</button>`;
//     bookContainer.appendChild(book);
//   });

//   const returnButtons = document.querySelectorAll(".return-button");
//   returnButtons.forEach((button) => {
//     button.addEventListener("click", () => {
//       const borrowedBookId = button.getAttribute("data-borrowed-book-id");
//       returnBook(borrowedBookId); // Call returnBook function with borrowedBookId
//     });
//   });
// };

let userBooks = []; // Define userBooks globally to make it accessible across functions
let currentuser = [];

const fetchUserBooks = () => {
  const request = new XMLHttpRequest();
  request.open(
    "GET",
    `http://127.0.0.1:8000/borrowedbooks/?user_id=${currentuser.user.id}`
  );
  request.responseType = "json";
  request.send();

  request.onload = function () {
    userBooks = request.response;
    renderBooks(userBooks);
  };
};

let userRequest = new XMLHttpRequest();
userRequest.open("GET", "http://127.0.0.1:8000/currentuser/");
userRequest.responseType = "json";
userRequest.send();

userRequest.onload = function () {
  currentuser = userRequest.response;
  fetchUserBooks();
};

// Fetch user books when the script loads

const bookContainer = document.querySelector(".book-grid");
const searchBar = document.querySelector(".search-bar");

searchBar.addEventListener("input", () => {
  const searchTerm = searchBar.value.toLowerCase();
  const filteredBooks = userBooks.filter((borrowedBook) => {
    const bookDetails = borrowedBook.book;
    return (
      bookDetails.title.toLowerCase().includes(searchTerm) ||
      bookDetails.author.toLowerCase().includes(searchTerm) ||
      bookDetails.category.toLowerCase().includes(searchTerm)
    );
  });

  bookContainer.innerHTML = ``;
  renderBooks(filteredBooks);
});

const returnBook = (borrowedBookId) => {
  const requestBody = {
    user_id: currentuser.user.id, // Assuming user ID is 2
    book_id: borrowedBookId,
  };

  const request = new XMLHttpRequest();
  request.open(
    "DELETE",
    `http://127.0.0.1:8000/borrowedbooks/?user_id=${requestBody.user_id}&book_id=${requestBody.book_id}`
  );
  request.onload = function () {
    if (request.status >= 200 && request.status < 300) {
      // alert("Book returned successfully!");
      // After successful deletion, we will also remove the returned book from the UI
      const index = userBooks.findIndex(
        (book) => book.book.id === parseInt(borrowedBookId)
      );
      // console.log(index);
      userBooks.splice(index, 1);
      renderBooks(userBooks);
    } else {
      console.error("Failed to return the book:", request.statusText);
      // Handle errors if needed
    }
  };
  request.onerror = function () {
    console.error("Request failed");
    // Handle errors if needed
  };
  request.send();
};

const renderBooks = (userBooks) => {
  // Clear the existing book container before rendering
  bookContainer.innerHTML = "";

  userBooks.forEach((borrowedBook) => {
    const bookDetails = borrowedBook.book;
    const book = document.createElement("div");
    book.classList.add("book");
    book.innerHTML = `
                        
                          <a href="./bookDescription.html?index=${bookDetails.id}" target="_blank">
                            <img src="${bookDetails.image}" alt="${bookDetails.title}" />
                          </a>
                        
                        <p>${bookDetails.title}</p>
                        <button class="return-button" data-borrowed-book-id="${bookDetails.id}">Return</button>`;
    bookContainer.appendChild(book);
  });

  const returnButtons = document.querySelectorAll(".return-button");
  returnButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const borrowedBookId = button.getAttribute("data-borrowed-book-id");
      returnBook(borrowedBookId); // Call returnBook function with borrowedBookId
    });
  });
};
