import { category } from "./data.js";

const categorySelect = document.querySelector(".category");
category.map((data) => {
  const option = document.createElement("option");
  option.value = data;
  option.innerHTML = data;
  categorySelect.appendChild(option);
});
