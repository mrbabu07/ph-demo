const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 4000;
const DATA_FILE = path.join(__dirname, "products.json");

// Middleware
app.use(cors());
app.use(express.json());

// Initialize products file if it doesn't exist
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
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
    },
  ];
  fs.writeFileSync(DATA_FILE, JSON.stringify(initialProducts, null, 2));
}

// Helper functions
const readProducts = () => {
  const data = fs.readFileSync(DATA_FILE, "utf8");
  return JSON.parse(data);
};

const writeProducts = (products) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(products, null, 2));
};

// Routes

// Get all products
app.get("/api/products", (req, res) => {
  try {
    const products = readProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// Get single product
app.get("/api/products/:id", (req, res) => {
  try {
    const products = readProducts();
    const product = products.find((p) => p.id === parseInt(req.params.id));

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

// Create new product
app.post("/api/products", (req, res) => {
  try {
    const products = readProducts();
    const newProduct = {
      id: products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1,
      ...req.body,
      createdAt: new Date().toISOString(),
    };

    products.push(newProduct);
    writeProducts(products);

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Failed to create product" });
  }
});

// Update product
app.put("/api/products/:id", (req, res) => {
  try {
    const products = readProducts();
    const index = products.findIndex((p) => p.id === parseInt(req.params.id));

    if (index === -1) {
      return res.status(404).json({ error: "Product not found" });
    }

    products[index] = {
      ...products[index],
      ...req.body,
      id: products[index].id,
      updatedAt: new Date().toISOString(),
    };

    writeProducts(products);
    res.json(products[index]);
  } catch (error) {
    res.status(500).json({ error: "Failed to update product" });
  }
});

// Delete product
app.delete("/api/products/:id", (req, res) => {
  try {
    const products = readProducts();
    const filteredProducts = products.filter(
      (p) => p.id !== parseInt(req.params.id)
    );

    if (products.length === filteredProducts.length) {
      return res.status(404).json({ error: "Product not found" });
    }

    writeProducts(filteredProducts);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`API endpoints:`);
  console.log(`  GET    /api/products`);
  console.log(`  GET    /api/products/:id`);
  console.log(`  POST   /api/products`);
  console.log(`  PUT    /api/products/:id`);
  console.log(`  DELETE /api/products/:id`);
});
