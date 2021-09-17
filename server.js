const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const morgan = require('morgan');
const cors = require('cors');
const { connectDb } = require('./db');

//Mounting Route files
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const stripeRoutes = require('./routes/stripeRoutes');

//Mounting Error Middlewares Files
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');

//Database Connection
connectDb();

//Express Middlewares
app.use(express.json());
if (process.env.NODE_Env === 'dev') {
  app.use(morgan('dev'));
}
app.use(cors());

//Routes Middlewares
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/checkout', stripeRoutes);

//Error Middlewares
app.use(notFound);

app.use(errorHandler);

//Server Code
app.listen(
  process.env.PORT,
  console.log(`Server is running on port ${process.env.PORT}`)
);
