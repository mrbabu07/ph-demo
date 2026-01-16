import { NextResponse } from "next/server";

// Check if KV is available
let kv = null;
try {
  const kvModule = await import("@vercel/kv");
  kv = kvModule.kv;
} catch (error) {
  console.log("KV not available");
}

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

// In-memory fallback
let memoryCache = null;

// Helper functions
const readProducts = async () => {
  // If KV is available and configured
  if (kv && process.env.KV_REST_API_URL) {
    try {
      const products = await kv.get("products");

      if (!products || products.length === 0) {
        const initialProducts = getInitialProducts();
        await kv.set("products", initialProducts);
        return initialProducts;
      }

      return products;
    } catch (error) {
      console.log("KV error:", error.message);
    }
  }

  // Fallback to memory cache
  if (!memoryCache) {
    memoryCache = getInitialProducts();
  }
  return memoryCache;
};

const writeProducts = async (products) => {
  // Try KV first
  if (kv && process.env.KV_REST_API_URL) {
    try {
      await kv.set("products", products);
      return;
    } catch (error) {
      console.log("KV write error:", error.message);
    }
  }

  // Fallback to memory
  memoryCache = products;
};

// GET /api/products - Get all products
export async function GET() {
  try {
    const products = await readProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error("GET error:", error);
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
    console.error("POST error:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
