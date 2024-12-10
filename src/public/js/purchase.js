const ticketsContainer = document.querySelector(".ticketsContainer");
const cartId = localStorage.getItem("cartID");
const cart = document.querySelector(".cart");

ticketsContainer.addEventListener("click", async (e) => {
    e.preventDefault();
    
    if(e.target.classList.contains("delete")){
        const id = e.target.id;
        
        try {
            await fetch(`/api/tickets/${id}`, {
                method: "DELETE",
            });
            e.target.parentElement.remove();
            window.location.reload();            
        } catch (error) {
            console.log(error);
        }
    }
})

cart.addEventListener("click", async (e) => {
    e.preventDefault();
    window.location.href = `/cart/${cartId}`;
})
