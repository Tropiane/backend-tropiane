const formProduct = document.getElementById("productForm");

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