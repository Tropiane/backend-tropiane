const cartProduct = document.querySelector(".cartContainer");
const emptyCart = document.querySelector(".emptyCart");
const checkout = document.querySelector(".checkout");
const cart = document.querySelector(".cart");

const code = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const generateCode = () => {
    let code = "";
    for (let i = 0; i < 10; i++) {
        const random = Math.floor(Math.random() * code.length);
        code = random + code;
    }
    return code;
}

const setCart = () => {
     localStorage.setItem("cartID", cart.id);
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
        const cart = localStorage.getItem("cartID");
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

checkout.addEventListener("click", async (e) => {
    e.preventDefault();

    const cart = localStorage.getItem("cartID");
    const total = document.querySelector(".total").textContent.split(" ")[2];
    const user = localStorage.getItem("user");
    const code = generateCode();

    await fetch(`/api/cart/${cart}/purchase`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ total, user, code}),
    })

    window.location.href = `/cart/${cart}/purchase`;
    
})