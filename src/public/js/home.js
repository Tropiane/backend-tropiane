const productsContainer = document.querySelector(".productsContainer");
const pagesContainer = document.querySelector(".pagesContainer");
const filters = document.querySelector(".productFilters");
const categories = document.querySelectorAll(".category");
const stock = document.querySelectorAll(".stock");

async function getOrCreateCartId() {
  let cartId = localStorage.getItem('cartId');
  
  if (!cartId) {
    try {
      const response = await fetch('/api/carts/create', { method: 'POST' });
      const newCart = await response.json();
      cartId = newCart._id;
      localStorage.setItem('cartId', cartId);
    } catch (error) {
      console.error('Error al crear carrito:', error);
    }
  }

  return cartId;
}

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
  } else if (e.target.classList.contains("details")) {
    window.location.href = `/details/${e.target.id}`;
  } else if (e.target.classList.contains("addToCart")) {

    console.log("add to cart: " + e.target.id);
    try {
      const cartId = await getOrCreateCartId();

      const response = await fetch(`/api/carts/${cartId}/products/${e.target.id}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity: 1 })
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Producto añadido al carrito", result);
      } else {
        console.error("Error al añadir producto al carrito", result);
      }
    } catch (error) {
      console.error("Error al añadir producto al carrito", error);
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
