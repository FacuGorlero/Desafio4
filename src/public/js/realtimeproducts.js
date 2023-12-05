const socket = io();

socket.on('update-products', (data)=> {
    const productslist = document.querySelectorAll('#products')
    productslist.innerHTML = "";
    data.forEach((product)=>{
productslist.innerHTML +='<li> ${product.title} ${product.price} <button onclick="removeProduct(${product.id})">Remove</button></li>';
    })
});

const removeProduct = (id) => {
    fetch('api/products/${id}', {method: 'DELETE'})
.then((response)=> response.json())
.then((data)=>{
    console.log('succes:', data);
    if (data.status === 'error'){
        alert(data.message);
    }
})
.catch((error) => {
    console.log('error:', error);
});
}

const addProduct = () => {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;
    const thumbnails = [document.getElementById("thumbnail").value];
    const code = document.getElementById("code").value;
    const stock = document.getElementById("stock").value;
    const status = document.getElementById("status").checked;
    const category = document.getElementById("category").value;
    const product = {
      title,
      description,
      price,
      thumbnails,
      code,
      stock,
      status,
      category,
    };
    console.log(product);
    // call POST/api/products endpoint with the product object
    fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        if (data.status === "error") {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
