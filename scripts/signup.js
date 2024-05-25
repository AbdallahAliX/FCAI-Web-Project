const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// const signup = () => {
//   let signupData = {
//     username: document.getElementById("username").value,
//     email: document.getElementById("email").value,
//     password: document.getElementById("password").value,
//     confirmPassword: document.getElementById("confirmPassword").value,
//   };

//   if (
//     signupData.email === "" ||
//     signupData.password === "" ||
//     signupData.confirmPassword === ""
//   ) {
//     alert("Please fill in all fields");
//   } else {
//     if (!isValidEmail(signupData.email)) {
//       alert("Please enter a valid email address");
//     } else if (signupData.password.length < 8) {
//       alert("Password must be at least 8 characters");
//     } else if (signupData.password !== signupData.confirmPassword) {
//       alert("Passwords do not match");
//     } else {
//       window.location.href = "userDashboard.html";
//     }
//   }
// };

// document.getElementById("signupButton").addEventListener("click", signup);

document.addEventListener("DOMContentLoaded", () => {
  const signupButton = document.getElementById("signupButton");

  signupButton.addEventListener("click", async (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const role = document.getElementById("role").value;

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
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

    const signupData = {
      action: "signup",
      role: role,
      username: username,
      email: email,
      password: password,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/currentuser/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Signup successful:", result);
      // Optionally, redirect to another page or perform additional actions upon successful signup
      if (result.user.role === "Admin" || result.user.role === "admin") {
        window.location.href = "./AdminDashboard.html";
      } else {
        window.location.href = "./userDashboard.html";
      }
    } catch (error) {
      console.error("Error signing up:", error);
      alert("An error occurred. Please try again.");
    }
  });
});
