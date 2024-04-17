import { category } from "./data.js";

const categorySelect = document.querySelector(".category");
category.map((data) => {
  const option = document.createElement("option");
  option.value = data;
  option.innerHTML = data;
  categorySelect.appendChild(option);
});

// const editCategorySelect = document.querySelector(".editCategory");
// category.map((data) => {
//   const option = document.createElement("option");
//   option.value = data;
//   option.innerHTML = data;
//   editCategorySelect.appendChild(option);
// });
