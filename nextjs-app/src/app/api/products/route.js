import { NextResponse } from "next/server";

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

// In-memory storage (fallback when KV not available)
let memoryCache = null;

// Helper to get KV safely
async function getKV() {
  try {
    // Only try to use KV if environment variables are set
    if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
      const { kv } = await import("@vercel/kv");
      return kv;
    }
  } catch (error) {
    console.log("KV not available:", error.message);
  }
  return null;
}

// Helper functions
const readProducts = async () => {
  const kv = await getKV();

  // Try KV first if available
  if (kv) {
    try {
      const products = await kv.get("products");

      if (products && products.length > 0) {
        return products;
      }

      // Initialize KV with default products
      const initialProducts = getInitialProducts();
      await kv.set("products", initialProducts);
      return initialProducts;
    } catch (error) {
      console.log("KV read error:", error.message);
    }
  }

  // Fallback to memory cache
  if (!memoryCache) {
    memoryCache = getInitialProducts();
  }
  return memoryCache;
};

const writeProducts = async (products) => {
  const kv = await getKV();

  // Try KV first
  if (kv) {
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
    // Always return default products on error
    return NextResponse.json(getInitialProducts());
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
