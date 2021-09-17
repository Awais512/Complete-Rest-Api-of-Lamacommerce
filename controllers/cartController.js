const Cart = require('../models/Cart');
const asyncHandler = require('express-async-handler');

//@route        GET /api/cart/:id
//@desc         Get Product By ID
//@access       Private/Admin
const getAll = asyncHandler(async (req, res) => {
  const carts = await Cart.find();
  res.status(200).json(carts);
});

//@route        GET /api/cart/:id
//@desc         Get Product By ID
//@access       Public
const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne(req.user.id);
  res.status(200).json(cart);
});

//@route        PUT /api/products/:id
//@desc         Update Product By ID
//@access       Private/Admin
const updateCart = asyncHandler(async (req, res) => {
  const updatedCart = await Cart.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  );

  res.status(200).json(updatedCart);
});

//@route        DELETE /api/products/:id
//@desc         DELETE Product By ID
//@access       Private/Admin
const deleteCart = asyncHandler(async (req, res) => {
  await Cart.findByIdAndDelete(req.params.id);

  res.status(200).json({ msg: 'Cart Deleted Successfully' });
});

module.exports = {
  deleteCart,
  updateCart,
  getCart,
  getAll,
};
