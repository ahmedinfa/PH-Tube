// get category btns
const getCategoryBtns = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((response) => response.json())
    .then((data) => showCategoryBtns(data.categories));
};

// show btns in the ui
const showCategoryBtns = (categories) => {
  const categoryBtnContainer = document.querySelector("#categoryBtnsContainer");
  categories.forEach((element) => {
    const div = document.createElement("div");
    div.innerHTML = `<button class="btn btn-sm capitalize hover:bg-red-500 hover:text-white">
      ${element.category}
    </button>`;
    categoryBtnContainer.append(div);
  });
};

getCategoryBtns();
