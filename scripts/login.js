const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const login = () => {
  let loginData = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

  if (loginData.email === "" || loginData.password === "") {
    alert("Please fill in all fields");
  } else {
    if (loginData.email === "admin" && loginData.password === "admin") {
      window.location.href = "AdminDashboard.html";
    } else {
      if (!isValidEmail(loginData.email)) {
        alert("Please enter a valid email address");
      } else if (loginData.password.length < 8) {
        alert("Password must be at least 8 characters");
      } else {
        window.location.href = "userDashboard.html";
      }
    }
  }
};

document.getElementById("loginButton").addEventListener("click", login);
