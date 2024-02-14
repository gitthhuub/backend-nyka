const Product = require('../models/prod');

exports.createProduct = async (req, res) => {
  const { name, picture, description, gender, category, price } = req.body;

  try {
    const newProd = new Product({
      name,
      picture,
      description,
      gender,
      category,
      price,
    });

    await newProd.save();
    res.status(201).json(newProd);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create product' });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to get products' });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to get product' });
  }
};


exports.updateProduct = async (req, res) => {
  const { name, picture, description, gender, category, price } = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, picture, description, gender, category, price },
      { new: true, runValidators: true } 
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update product' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete product' });
  }
};


