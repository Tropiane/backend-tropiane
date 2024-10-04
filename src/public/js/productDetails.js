const container = document.querySelector(".productContainer");
const cart = localStorage.getItem("cartID");
const cartId = document.querySelector("#cart");

cartId.addEventListener("click", async (e) => {
    e.preventDefault();
    window.location.href = `/cart/${cart}`;
  });

container.addEventListener("click", async (e) => {
    e.preventDefault();
    const cart = localStorage.getItem("cartID");

    if (e.target.classList.contains("addToCart")) {
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

