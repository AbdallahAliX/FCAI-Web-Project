document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("addBookForm");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const bookData = {};
    formData.forEach((value, key) => {
      bookData[key] = value;
    });

    try {
      const response = await fetch("http://127.0.0.1:8000/books/", {
        method: "POST",
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
