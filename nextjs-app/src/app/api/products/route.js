import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Path to products.json file
const DATA_FILE = path.join(process.cwd(), "products.json");

// Initialize products file if it doesn't exist
const initializeProducts = () => {
  if (!fs.existsSync(DATA_FILE)) {
    const initialProducts = [
      {
        id: 1,
        name: "Wireless Headphones",
        description: "High-quality wireless headphones with noise cancellation",
        price: 99.99,
        stock: 50,
        category: "Electronics",
        image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
      },
      {
        id: 2,
        name: "Smart Watch",
        description: "Feature-rich smartwatch with fitness tracking",
        price: 199.99,
        stock: 30,
        category: "Electronics",
        image:
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
      },
      {
        id: 3,
        name: "Laptop Backpack",
        description: "Durable backpack with laptop compartment",
        price: 49.99,
        stock: 100,
        category: "Accessories",
        image:
          "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
      },
    ];
    fs.writeFileSync(DATA_FILE, JSON.stringify(initialProducts, null, 2));
  }
};

// Helper functions
const readProducts = () => {
  initializeProducts();
  const data = fs.readFileSync(DATA_FILE, "utf8");
  return JSON.parse(data);
};

const writeProducts = (products) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(products, null, 2));
};

// GET /api/products - Get all products
export async function GET() {
  try {
    const products = readProducts();
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
    const products = readProducts();

    const newProduct = {
      id: products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1,
      ...body,
      createdAt: new Date().toISOString(),
    };

    products.push(newProduct);
    writeProducts(products);

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
