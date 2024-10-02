const cartProduct = document.querySelector(".cartContainer");
const emptyCart = document.querySelector(".emptyCart");

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

    // if (e.target.classList.contains("sum")){
    //     const productId = e.target.id;
    //     let quantity = Number(e.target.parentElement.querySelector(".quantity").textContent) + 1;
        
    //     try {
    //         await fetch(`/api/cart/${cart}/product/${productId}`, {
    //             method: "PUT",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({quantity}),
    //         });
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // if (e.target.classList.contains("rest")){
    //     const productId = e.target.id;
    //     let quantity = e.target.parentElement.querySelector(".quantity").textContent <=1 ? 1 : Number(e.target.parentElement.querySelector(".quantity").textContent) - 1;
        
    //     try {
    //         await fetch(`/api/cart/${cart}/product/${productId}`, {
    //             method: "PUT",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({quantity}),
    //         });
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
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