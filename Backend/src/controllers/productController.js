import { Product } from "../models/Product.model.js";

export const createProduct = async (req, res) => {
  try {
    const { name, category, description, price, image } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : image || "";
    const product = new Product({
      name,
      category,
      description,
      price,
      image: imageUrl,
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};

    if (category) {
      filter.category = category;
    }

    const products = await Product.find(filter);
    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const updatedProducts = products.map((product) => {
      return {
        ...product._doc,
        image: product.image ? `${baseUrl}${product.image}` : "",
      };
    });

    res.json(updatedProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { name, category, description, price, images, inStock } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.name = name || product.name;
    product.category = category || product.category;
    product.description = description || product.description;
    product.price = price !== undefined ? price : product.price;
    product.images = images || product.images;
    product.inStock = inStock !== undefined ? inStock : product.inStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.deleteOne();
    res.json({ message: "Product removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
