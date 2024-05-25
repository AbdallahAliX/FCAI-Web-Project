const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// const login = () => {
//   let loginData = {
//     email: document.getElementById("email").value,
//     password: document.getElementById("password").value,
//   };

//   if (loginData.email === "" || loginData.password === "") {
//     alert("Please fill in all fields");
//   } else {
//     if (loginData.email === "admin" && loginData.password === "admin") {
//       window.location.href = "AdminDashboard.html";
//     } else {
//       if (!isValidEmail(loginData.email)) {
//         alert("Please enter a valid email address");
//       } else if (loginData.password.length < 8) {
//         alert("Password must be at least 8 characters");
//       } else {
//         window.location.href = "userDashboard.html";
//       }
//     }
//   }
// };

// document.getElementById("loginButton").addEventListener("click", login);

document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.getElementById("loginButton");

  loginButton.addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    if (!isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters.");
      return;
    }

    const loginData = {
      action: "login",
      email: email,
      password: password,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/currentuser/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Login successful:", result);
      // console.log("User role:", result.user.role);
      if (result.user.role === "Admin" || result.user.role === "admin") {
        window.location.href = "./AdminDashboard.html";
      } else {
        window.location.href = "./userDashboard.html";
      }
      // Optionally, redirect to another page or perform additional actions upon successful login
      // window.location.href = "./someOtherPage.html";
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Invalid email or password.");
    }
  });
});
