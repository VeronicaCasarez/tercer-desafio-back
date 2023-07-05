import fs from "fs";

class ProductManager {
  static productId = 1;

  constructor(path) {
    this.products = [];
    this.path = path;
  }

  async addProduct(product) {
    try {
      product.id = ProductManager.productId;
      ProductManager.productId++;

      this.products.push(product);

      await this.writeDataToFile(this.products);

      console.log("Producto agregado correctamente");
    } catch (err) {
      console.log(err);
    }
  }

  async getProducts() {
    try {
      const products = await this.readDataFromFile();
      return products; // Devolver los productos encontrados
    } catch (err) {
      console.log(err);
      return []; // Devolver un arreglo vacío en caso de error
    }
  }

  async getProductById(productId) {
    try {
      const products = await this.readDataFromFile();
      const productFind = products.find((product) => product.id === productId);
      if (!productFind) {
        console.log("Producto no encontrado");
        return null; // Devolver null si el producto no se encuentra
      } else {
        return productFind; // Devolver el producto encontrado
      }
    } catch (err) {
      console.log(err);
      return null; // Devolver null en caso de error
    }
  }

  async updateProduct(id, updatedFields) {
    try {
      const products = await this.readDataFromFile();
      const productIndex = products.findIndex((product) => product.id === id);

      if (productIndex !== -1) {
        const updatedProduct = { ...products[productIndex], ...updatedFields };
        products[productIndex] = updatedProduct;

        await this.writeDataToFile(products);

        console.log("Producto actualizado correctamente");
      } else {
        console.log("Producto no encontrado");
      }
    } catch (err) {
      console.log(err);
    }
  }

  async deleteProduct(id) {
    try {
      const products = await this.readDataFromFile();
      const updatedProducts = products.filter((product) => product.id !== id);

      await this.writeDataToFile(updatedProducts);

      console.log("Producto eliminado correctamente");
    } catch (err) {
      console.log(err);
    }
  }

  async readDataFromFile() {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch (err) {
      return [];
    }
  }

  async writeDataToFile(data) {
    try {
      await fs.promises.writeFile(this.path, JSON.stringify(data), "utf-8");
    } catch (err) {
      console.log(err);
    }
  }
}

const productManager = new ProductManager("../product.json");

productManager.addProduct({
  title: "Producto 1",
  description: "Descripción 1",
  price: 10.99,
  thumbnail: "imagen1.jpg",
  code: "P001",
  stock: 50,
});

productManager.addProduct({
  title: "Producto 2",
  description: "Descripción 2",
  price: 20.99,
  thumbnail: "imagen2.jpg",
  code: "P002",
  stock: 20,
});

productManager.addProduct({
  title: "Producto 3",
  description: "Descripción 3",
  price: 20.99,
  thumbnail: "imagen3.jpg",
  code: "P003",
  stock: 10,
});

productManager.getProducts();

productManager.getProductById(2);
//productManager.getProductById(6);

// productManager.updateProduct(2, {
//     title:'Producto 5',
//     description: 'Descripción 5',
//     price: 30.99,
//     thumbnail: 'imagen5.jpg',
//     code: 'P005',
//     stock: 60});
 
//productManager.deleteProduct(2)
export default ProductManager;
