const currentPage = window.location.pathname.split("/").pop();

if (currentPage === "landingPage.html") {
  const navbar = document.querySelector(".navbar");
  navbar.innerHTML = `
    <a href="#" class="nav-link">About Us</a>
  `;
} else if (
  currentPage === "allBooks.html" ||
  currentPage === "userDashboard.html"
) {
  const navbar = document.querySelector(".navbar");
  navbar.innerHTML = `
  <a href="./allBooks.html" class="nav-link">Rent a book</a>
  <a href="./userDashboard.html" class="nav-link">Your Books</a>
  <a href="#" class="nav-link">About Us</a>
  <a href="./landingPage.html" class="nav-link">Logout</a>
  `;
} else if (
  currentPage === "AdminDashboard.html" ||
  currentPage === "add.html" ||
  currentPage === "editBook.html"
) {
  const navbar = document.querySelector(".navbar");
  navbar.innerHTML = `
    <a href="./AdminDashboard.html" class="nav-link">Admin Dashboard</a>
    <a href="./add.html" class="nav-link">Add new book</a>
    <a href="#" class="nav-link">About Us</a>
    <a href="./landingPage.html" class="nav-link">Logout</a>
    `;
}
