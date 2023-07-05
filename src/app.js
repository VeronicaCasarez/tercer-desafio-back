import express from "express";
import ProductManager from "./productManager.js";

const app = express();
const productManager = new ProductManager("./product.json");
const port = 3000;

app.get("/products", async (req, res) => {
  try {
    const limit = req.query.limit;
    const products = await productManager.getProducts();

    if (limit) {
      res.json(products.slice(0, limit));
    } else {
      res.json(products);
    }
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/products/:pid", async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    const product = await productManager.getProductById(productId);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
