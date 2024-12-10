const email = document.querySelector("#email")
document.querySelector("#logout").addEventListener("click", async (e) => {
    localStorage.removeItem("cartID");
    
})

document.addEventListener("DOMContentLoaded", async (e) => {
    const user = email.textContent.split(" ")[1];
    localStorage.setItem("user", user);
    
})