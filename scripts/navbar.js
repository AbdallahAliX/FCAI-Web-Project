document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop();

  if (currentPage === "landingPage.html") {
    const navbar = document.querySelector(".navbar");
    navbar.innerHTML = `
      <a href="./aboutUs.html" class="nav-link" target="blank">About Us</a>
    `;
  } else if (currentPage === "Login.html" || currentPage === "SignUp.html") {
    const navbar = document.querySelector(".navbar");
    navbar.innerHTML = `
      <a href="./landingPage.html" class="nav-link">Home</a>
      <a href="./aboutUs.html" class="nav-link" target="blank">About Us</a>
    `;
  } else {
    fetch("http://127.0.0.1:8000/currentuser/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        const navbar = document.querySelector(".navbar");
        if (result.user.role === "user" || result.user.role === "User") {
          navbar.innerHTML = `
            <a href="./allBooks.html" class="nav-link">Rent a book</a>
            <a href="./userDashboard.html" class="nav-link">Your Books</a>
            <a href="./aboutUs.html" class="nav-link" target="blank">About Us</a>
            <a href="./landingPage.html" class="nav-link" id="logoutLink">Logout</a>
          `;
        } else if (
          result.user.role === "admin" ||
          result.user.role === "Admin"
        ) {
          navbar.innerHTML = `
            <a href="./AdminDashboard.html" class="nav-link">Admin Dashboard</a>
            <a href="./add.html" class="nav-link">Add new book</a>
            <a href="./aboutUs.html" class="nav-link" target="blank">About Us</a>
            <a href="./landingPage.html" class="nav-link" id="logoutLink">Logout</a>
          `;
        }

        // Add event listener for the logout link
        const logoutLink = document.getElementById("logoutLink");
        if (logoutLink) {
          logoutLink.addEventListener("click", (event) => {
            event.preventDefault();
            fetch("http://127.0.0.1:8000/currentuser/", {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ action: "logout" }),
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
                }
                console.log("Logged out successfully!");
                window.location.href = "./landingPage.html";
              })
              .catch((error) => {
                console.error("Error logging out:", error);
                // Optionally, handle the error, e.g., show an error message
              });
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        // Optionally, handle the error, e.g., show an error message or redirect
      });
  }
});
