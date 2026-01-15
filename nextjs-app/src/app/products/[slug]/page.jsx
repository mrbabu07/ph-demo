import React from "react";

async function ProductDetails({ params }) {
  const { slug } = params;

  return (
    <div>
      <h1>Product Details Page{slug}</h1>
      <p>Product slug: {slug}</p>
    </div>
  );
}

export default ProductDetails;
