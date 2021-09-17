const Product = require('../models/Product');
const asyncHandler = require('express-async-handler');

//@route        POST /api/products
//@desc         Create New Product
//@access       Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(200).json(product);
});

//@route        GET /api/products
//@desc         Get all Products
//@access       Public
const getProducts = asyncHandler(async (req, res) => {
  let products;
  const productQuery = req.query.new;
  const categoryQuery = req.query.category;

  if (productQuery) {
    products = await Product.find().sort({ createdAt: -1 }).limit(5);
  } else if (categoryQuery) {
    products = await Product.find({
      categories: {
        $in: [categoryQuery],
      },
    });
  } else {
    products = await Product.find();
  }

  res.status(200).json(products);
});

//@route        GET /api/products/:id
//@desc         Get Product By ID
//@access       Public
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.status(200).json(product);
});

//@route        PUT /api/products/:id
//@desc         Update Product By ID
//@access       Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  );
  if (!updatedProduct) {
    throw new Error('Product not Found');
  }
  res.status(200).json(updatedProduct);
});

//@route        DELETE /api/products/:id
//@desc         DELETE Product By ID
//@access       Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    throw new Error('Product not Found');
  }
  res.status(200).json({ msg: 'Product Deleted Successfully' });
});

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
