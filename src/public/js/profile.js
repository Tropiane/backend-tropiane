const email = document.querySelector("#email")
const cartId = localStorage.getItem("cartID");
const cart = document.querySelector(".cart");

document.querySelector("#logout").addEventListener("click", async (e) => {
    localStorage.removeItem("cartID");
    
})

document.addEventListener("DOMContentLoaded", async (e) => {
    const user = email.textContent.split(" ")[1];
    localStorage.setItem("user", user);
    
})
cart.addEventListener("click", async (e) => {
    e.preventDefault();
    window.location.href = `/cart/${cartId}`;
})