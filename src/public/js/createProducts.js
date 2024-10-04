const formProduct = document.getElementById("productForm");
const cart = localStorage.getItem("cartID");
const cartId = document.querySelector("#cart");

formProduct.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(formProduct);
  
  try {
    await fetch("/api/products", {
      method: "POST",
      body: formData,
    });
  } catch (error) {
    console.log(error);
    
  }
  
})

cartId.addEventListener("click", async (e) => {
  e.preventDefault();
  window.location.href = `/cart/${cart}`;
})