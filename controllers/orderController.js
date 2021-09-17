const Order = require('../models/Order');
const asyncHandler = require('express-async-handler');

//@route        GET /api/orders
//@desc         Get Product By ID
//@access       Private/Admin
const createOrder = asyncHandler(async (req, res) => {
  const newOrder = new Order(req.body);

  const order = await newOrder.save();
  res.status(200).json(order);
});

//@route        GET /api/orders
//@desc         Get Product By ID
//@access       Private/Admin
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find();
  res.status(200).json(orders);
});

//@route        GET /api/orders/:id
//@desc         Get Product By ID
//@access       Public
const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findOne({ userId: req.user.id });
  res.status(200).json(order);
});

//@route        PUT /api/orders/:id
//@desc         Update Order
//@access       Private/Admin
const updateOrder = asyncHandler(async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  );

  res.status(200).json(order);
});

//@route        DELETE /api/orders/:id
//@desc         DELETE Order
//@access       Private/Admin
const deleteOrder = asyncHandler(async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);

  res.status(200).json({ msg: 'Order Deleted Successfully' });
});

//@route        GET /api/orders/income
//@desc         Get Monthly Income
//@access       Private/Admin
const getMonthlyIncome = asyncHandler(async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  const income = await Order.aggregate([
    { $match: { createdAt: { $gte: previousMonth } } },
    {
      $project: {
        month: { $month: '$createdAt' },
        sales: '$amount',
      },
    },
    {
      $group: {
        _id: '$month',
        total: { $sum: '$sales' },
      },
    },
  ]);
  res.status(200).json(income);
});

module.exports = {
  getAllOrders,
  updateOrder,
  createOrder,
  getOrder,
  deleteOrder,
  getMonthlyIncome,
};
