const socket = io();
const newProductsContainer = document.querySelector('.newProductsContainer');

document.getElementById('productForm').addEventListener('submit', (e) => {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const productData = Object.fromEntries(formData.entries());

  fetch('/api/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(productData)
  }).then(response => response.json())
    .then(data => {
      socket.emit('newProduct', data);
    })
    .catch(error => console.error('Error:', error));
});

socket.on('productAdded', (product) => {
  let html;

  html = `
        <div class="newProduct">
            <p>${product.title}</p>
            <img src=${product.thumbnail}>
            <p>$${product.price}</p>
            <p>${product.description}</p>
        </div>
  `

  newProductsContainer.innerHTML += html
});