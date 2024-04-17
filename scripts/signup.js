const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const signup = () => {
  let signupData = {
    username: document.getElementById("username").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    confirmPassword: document.getElementById("confirmPassword").value,
  };

  if (
    signupData.email === "" ||
    signupData.password === "" ||
    signupData.confirmPassword === ""
  ) {
    alert("Please fill in all fields");
  } else {
    if (!isValidEmail(signupData.email)) {
      alert("Please enter a valid email address");
    } else if (signupData.password.length < 8) {
      alert("Password must be at least 8 characters");
    } else if (signupData.password !== signupData.confirmPassword) {
      alert("Passwords do not match");
    } else {
      window.location.href = "userDashboard.html";
    }
  }
};

document.getElementById("signupButton").addEventListener("click", signup);
