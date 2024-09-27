
const productsContainer = document.querySelector(".productsContainer");
const pagesContainer = document.querySelector(".pagesContainer");
const filters = document.querySelector(".productFilters");
const categories = document.querySelectorAll(".category");
const stock = document.querySelectorAll(".stock");

productsContainer.addEventListener("click", async (e) => {
  if (e.target.classList.contains("delete")) {
    console.log("delete product " + e.target.id);

    try {
      await fetch(`/api/products/${e.target.id}`, {
        method: "DELETE",
      });
      e.target.parentElement.remove();
    } catch (error) {
      console.log(error);
    }
  }
});

productsContainer.addEventListener("click", async (e) => {
  e.preventDefault();

  e.target.classList.contains("details") &&
    (window.location.href = `/details/${e.target.id}`);
});

pagesContainer.addEventListener("click", async (e) => {
  e.preventDefault();

  e.target.classList.contains("prev") &&
    (window.location.href = `/products?page=${e.target.id}`);
  e.target.classList.contains("next") &&
    (window.location.href = `/products?page=${e.target.id}`);
});

function updateURLParameter(param, value) {
  const currentUrl = new URL(window.location.href);
  
  currentUrl.searchParams.set(param, value);
  
  window.location.href = currentUrl.href;
}

filters.addEventListener("click", (e) => {
  e.preventDefault();

  if (e.target.classList.contains("price")) {
    updateURLParameter("price", e.target.value);
  }
  
  if (e.target.classList.contains("all")) {
    window.location.href = `/products`;
  }
});

categories.forEach((category) => {
  category.addEventListener("click", (e) => {
    e.preventDefault();
    updateURLParameter("category", e.target.value);
  });
});


stock.forEach((stockItem) => {
  stockItem.addEventListener("click", (e) => {
    e.preventDefault();
    updateURLParameter("status", e.target.value);
  });
});
