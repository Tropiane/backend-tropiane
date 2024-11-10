const cartProduct = document.querySelector(".cartContainer");
const emptyCart = document.querySelector(".emptyCart");
const cart = document.querySelector(".cart");

const setCart = () => {
     const cartId = cart.target.id;
     console.log(cartId);
     
}

document.addEventListener("DOMContentLoaded", () => {
    setCart();
})

cartProduct.addEventListener("click", async (e) => {
    e.preventDefault();
    const cart = localStorage.getItem("cartID");

    if (e.target.classList.contains("delete")) {
        const productId = e.target.id;
        
        try {
            await fetch(`/api/cart/${cart}/product/${productId}`, {
                method: "DELETE",
            });
            e.target.parentElement.parentElement.remove();
        } catch (error) {
            console.log(error);
        }
    }

    if (e.target.classList.contains("sum")) {
        const productId = e.target.id;
        let quantityElement = e.target.parentElement.querySelector(".quantity");
        let quantity = parseInt(quantityElement.textContent);
        quantityElement.textContent = quantity + 1;
        
        try {
            await fetch(`/api/cart/${cart}/product/${productId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ quantity: quantity + 1 })
            });
        } catch (error) {
            console.log(error);
        }
    }

    if (e.target.classList.contains("rest")) {
        const productId = e.target.id;
        let quantityElement = e.target.parentElement.querySelector(".quantity");
        let quantity = parseInt(quantityElement.textContent);
        quantityElement.textContent = quantity - 1;
        
        try {
            await fetch(`/api/cart/${cart}/product/${productId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ quantity: quantity - 1 })
            });
        } catch (error) {
            console.log(error);
        }
    }
})

emptyCart.addEventListener("click", async (e) => {
    e.preventDefault();
    const cart = localStorage.getItem("cartID");
    try {
        await fetch(`/api/cart/${cart}`, {
            method: "DELETE",
        });
        window.location.reload();
    } catch (error) {
        console.log(error);
    }
})