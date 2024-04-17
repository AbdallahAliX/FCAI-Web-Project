const category = [
  "All",
  "History",
  "Fantasy",
  "Romance",
  "Crime",
  "Horror",
  "Science Fiction",
  "Biography",
  "Adventure",
  "Sports",
];
const categorySelect = document.querySelector(".category");
category.map((data) => {
  const option = document.createElement("option");
  option.value = data;
  option.innerHTML = data;
  categorySelect.appendChild(option);
});
