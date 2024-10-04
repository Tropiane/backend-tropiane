const productsContainer = document.querySelector(".productsContainer");
const pagesContainer = document.querySelector(".pagesContainer");
const filters = document.querySelector(".productFilters");
const categories = document.querySelectorAll(".category");
const stock = document.querySelectorAll(".stock");
const cart = localStorage.getItem("cartID");
const cartId = document.querySelector("#cart");

async function createCart() {
  const response = await fetch("/api/cart", {method: "POST"});
  const cartId = await response.json();
  
  localStorage.setItem("cartID", cartId);
}

function updateURLParameter(param, value) {
  const currentUrl = new URL(window.location.href);
  
  currentUrl.searchParams.set(param, value);
  
  window.location.href = currentUrl.href;
}

document.addEventListener("DOMContentLoaded", async () => {
  if (!cart) {
    await createCart();
  }
});

productsContainer.addEventListener("click", async (e) => {
  e.target.classList.contains("details") &&(window.location.href = `/details/${e.target.id}`)



  if (e.target.classList.contains("addToCart")) {
    const cart = localStorage.getItem("cartID");
    const productId = e.target.id;
    try {
      await fetch(`/api/cart/${cart}/product/${productId}`, {
        method: "PUT",
      });
    } catch (error) {
      console.log(error);
    }
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

cartId.addEventListener("click", async (e) => {
  e.preventDefault();
  window.location.href = `/cart/${cart}`;
})