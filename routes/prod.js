const express = require('express');
const Product = require('../models/product');
const router = express.Router();

// POST /api/products - Create a new product
router.post('/', async (req, res) => {
  const { name, picture, description, gender, category, price } = req.body;

  try {
    const newProd = new Product({
      name,
      picture,
      description,
      gender,
      category,
      price
    });

    await newProd.save();
    res.status(201).json(newProd);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create product' });
  }
});


router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to get products' });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
   
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid product ID' });
    }
    console.error(error);
    res.status(500).json({ message: 'Failed to get product' });
  }
});



router.put('/:id', async (req, res) => {
  const { name, picture, description, gender, category, price } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
      name,
      picture,
      description,
      gender,
      category,
      price
    }, { new: true }); 
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update product' });
  }
});


router.delete('/:id', async (req, res) => {
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
});

module.exports = router;