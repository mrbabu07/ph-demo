import React from "react";

async function AddProduct() {
  let data = await fetch("https://fakestoreapi.com/products")
let posts = await data.json();
  

  return (
    <div>
      <p>This is add product page</p>
    </div>
  );
}

export default AddProduct;
