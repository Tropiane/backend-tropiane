const productsContainer = document.querySelector(".productsContainer");

productsContainer.addEventListener("click", async (e) => {
    if(e.target.classList.contains("delete")){
        console.log("delete product " + e.target.id);
        
        try {
            await fetch(`/api/products/${e.target.id}`, {
                method: "DELETE",
            });
            e.target.parentElement.remove();
        } catch (error) {
            console.log(error);   
        }
    }

})

productsContainer.addEventListener("click", async (e) => {
    e.preventDefault();
    
    e.target.classList.contains("details") && (window.location.href = `/details/${e.target.id}`)
})