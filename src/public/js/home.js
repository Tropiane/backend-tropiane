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
  } else if(e.target.classList.contains("details")) {
    window.location.href = `/details/${e.target.id}`;
  }

});


pagesContainer.addEventListener("click", async (e) => {
  e.preventDefault();

  if (e.target.classList.contains("prev")) {
      const page = e.target.getAttribute("data-page");
      window.location.href = `/products?page=${page}`;
  }

  if (e.target.classList.contains("next")) {
      const page = e.target.getAttribute("data-page");
      window.location.href = `/products?page=${page}`;
  }
});


function updateURLParameter(param, value) {
  const currentUrl = new URL(window.location.href);
  
  currentUrl.searchParams.set(param, value);
  
  window.location.href = currentUrl.href;
}

filters.addEventListener("change", (e) => {
  e.preventDefault();

  if (e.target.classList.contains("price")) {
    updateURLParameter("price", e.target.value);
  }
  
  if (e.target.classList.contains("all")) {
    window.location.href = `/products`;
  }
});

[...categories, ...stock].forEach((item) => {
  item.addEventListener("change", (e) => {
    e.preventDefault();
    const param = e.target.classList.contains("category") ? "category" : "status";
    updateURLParameter(param, e.target.value);
  });
});
