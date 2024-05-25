// // document.addEventListener("DOMContentLoaded", () => {
// //   const form = document.querySelector("form");

// //   // Get book ID from URL
// //   const urlParams = new URLSearchParams(window.location.search);
// //   const bookId = urlParams.get("id");

// //   // Fetch book details using the book ID
// //   fetch(`http://127.0.0.1:8000/books/${bookId}`)
// //     .then((response) => {
// //       if (!response.ok) {
// //         throw new Error(`HTTP error! status: ${response.status}`);
// //       }
// //       return response.json();
// //     })
// //     .then((book) => {
// //       // Populate form fields with book details
// //       document.getElementById("name").value = book.name;
// //       document.getElementById("author").value = book.author;
// //       document.getElementById("year").value = book.year;
// //     })
// //     .catch((error) => {
// //       console.error("Error fetching book details:", error);
// //     });

// //   // Handle form submission
// //   form.addEventListener("submit", (event) => {
// //     event.preventDefault();

// //     // Create updated book object from form inputs
// //     const updatedBook = {
// //       name: document.getElementById("name").value,
// //       author: document.getElementById("author").value,
// //       year: document.getElementById("year").value,
// //     };

// //     // Send PUT request to update book details
// //     fetch(`http://127.0.0.1:8000/books/${bookId}`, {
// //       method: "PUT",
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //       body: JSON.stringify(updatedBook),
// //     })
// //       .then((response) => {
// //         if (!response.ok) {
// //           throw new Error(`HTTP error! status: ${response.status}`);
// //         }
// //         console.log("Book updated successfully!");
// //         // Redirect to admin dashboard after updating
// //         window.location.href = "./AdminDashboard.html";
// //       })
// //       .catch((error) => {
// //         console.error("Error updating book:", error);
// //       });
// //   });
// // });

// document.addEventListener("DOMContentLoaded", () => {
//   const form = document.querySelector("form");

//   // Get book ID from URL
//   const urlParams = new URLSearchParams(window.location.search);
//   const bookId = urlParams.get("id");

//   // Fetch book details using the book ID
//   fetch(`http://127.0.0.1:8000/books/${bookId}`)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       return response.json();
//     })
//     .then((book) => {
//       // Populate form fields with book details
//       document.getElementById("name").value = book.name;
//       document.getElementById("author").value = book.author;
//       document.getElementById("year").value = book.year;
//     })
//     .catch((error) => {
//       console.error("Error fetching book details:", error);
//     });

//   // Handle form submission
//   form.addEventListener("submit", (event) => {
//     event.preventDefault();

//     // Create updated book object from form inputs
//     const updatedBook = {
//       book_id: bookId,
//       name: document.getElementById("name").value,
//       author: document.getElementById("author").value,
//       year: document.getElementById("year").value,
//     };

//     // Send PUT request to update book details
//     fetch(`http://127.0.0.1:8000/books/`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(updatedBook),
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         console.log("Book updated successfully!");
//         // Redirect to admin dashboard after updating
//         window.location.href = "./AdminDashboard.html";
//       })
//       .catch((error) => {
//         console.error("Error updating book:", error);
//       });
//   });
// });

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("editBookForm");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get("id");

    const formData = new FormData(form);
    const bookData = {};
    for (const [key, value] of formData.entries()) {
      // Only include values that are not empty
      if (value.trim() !== "") {
        bookData[key] = value;
      }
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/books/${bookId}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log("Book added successfully!");
      window.location.href = "./AdminDashboard.html";
    } catch (error) {
      console.error("Error adding book:", error);
      // Optionally, display an error message to the user
    }
  });
});
