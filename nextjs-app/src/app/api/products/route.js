import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";

// Initial products data
const getInitialProducts = () => [
  {
    id: 1,
    name: "Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation",
    price: 99.99,
    stock: 50,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
  },
  {
    id: 2,
    name: "Smart Watch",
    description: "Feature-rich smartwatch with fitness tracking",
    price: 199.99,
    stock: 30,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
  },
  {
    id: 3,
    name: "Laptop Backpack",
    description: "Durable backpack with laptop compartment",
    price: 49.99,
    stock: 100,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
  },
];

// Helper functions
const readProducts = async () => {
  try {
    // Try to get products from Vercel KV
    const products = await kv.get("products");

    if (!products || products.length === 0) {
      // Initialize with default products
      const initialProducts = getInitialProducts();
      await kv.set("products", initialProducts);
      return initialProducts;
    }

    return products;
  } catch (error) {
    // If KV is not configured (local dev), return initial products
    console.log("KV not available, using initial products");
    return getInitialProducts();
  }
};

const writeProducts = async (products) => {
  try {
    await kv.set("products", products);
  } catch (error) {
    console.log("KV not available, products not persisted");
  }
};

// GET /api/products - Get all products
export async function GET() {
  try {
    const products = await readProducts();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// POST /api/products - Create new product
export async function POST(request) {
  try {
    const body = await request.json();
    const products = await readProducts();

    const newProduct = {
      id: products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1,
      ...body,
      createdAt: new Date().toISOString(),
    };

    products.push(newProduct);
    await writeProducts(products);

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
