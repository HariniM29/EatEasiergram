const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const data = require('./data');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt=require('bcrypt')



// Enable CORS


dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(cors());
mongoose.connect('mongodb+srv://yuvaraj0313:nlPvjLZbt8gY42OX@cartyy.mpvbcai.mongodb.net/foodapp', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const Product = mongoose.model(
  'products',
  new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    price: Number,
    calorie: Number,
    category: String,
  })
);

const User = mongoose.model('User', {
  email: String,
  password: String,
});




app.post('/api/signup', async (req, res) => {
  console.log('sigup')
  try {
    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Create a new user
    const newUser = new User({
      email: req.body.email,
      password: req.body.password,
    });

    // Save the user to the database
    await newUser.save();

    // Generate JWT token


    // Return success response with token
    res.status(201).json({ message: 'RegsiteredSuccessfully' });
  } catch (error) {
    console.error('Signup failed:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.post('/api/login', async (req, res) => {
  try {
    // Find the user in the database based on the provided email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Check if the provided password matches the user's password
    if (req.body.password != user.password) {
      return res.status(401).json({ message: 'Authentication failed 4' });
    }



    // Return success response with token
    res.status(200).json({ message: 'Authentication successful' });
  } catch (error) {
    console.error('Login failed:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
app.get('/api/categories', (req, res) => {
  console.log('Received GET request for /api/categories');
  res.send(data.categories);
});


app.get('/api/products', async (req, res) => {
  
  const { category } = req.query;
  const products = await Product.find(category ? { category } : {});
  res.send(products);
});

app.get('/api/products/seed', async (req, res) => {
  // await Product.remove({});
  const products = await Product.insertMany(data.products);
  res.send({ products });
});

app.post('/api/products', async (req, res) => {
  const newProduct = new Product(req.body);
  const savedProduct = await newProduct.save();
  res.send(savedProduct);
});

app.delete('/api/products/:id', async (req, res) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);
  res.send(deletedProduct);
});

const Order = mongoose.model(
  'order',
  new mongoose.Schema(
    {
      number: { type: Number, default: 0 },
      orderType: String,
      paymentType: String,
      isPaid: { type: Boolean, default: false },
      isReady: { type: Boolean, default: false },
      inProgress: { type: Boolean, default: true },
      isCanceled: { type: Boolean, default: false },
      isDelivered: { type: Boolean, default: false },
      totalPrice: Number,
      taxPrice: Number,
      orderItems: [
        {
          name: String,
          price: Number,
          quantity: Number,
        },
      ],
    },
    {
      timestamps: true,
    }
  )
);

app.post('/api/orders', async (req, res) => {
  console.log('fghj')
  const lastOrder = await Order.find().sort({ number: -1 }).limit(1);
  const lastNumber = lastOrder.length === 0 ? 0 : lastOrder[0].number;
  if (
    !req.body.orderType ||
    !req.body.paymentType ||
    !req.body.orderItems ||
    req.body.orderItems.length === 0
  ) {
   
    return res.send({ message: 'Data is required.' });
  }
  const order = await Order({ ...req.body, number: lastNumber + 1 }).save();
  res.send(order);
});
app.get('/api/orders', async (req, res) => {
  console.log('fghj')
  const orders = await Order.find({ isDelivered: false, isCanceled: false });
  res.send(orders);
});
app.put('/api/orders/:id', async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    if (req.body.action === 'ready') {
      order.isReady = true;
      order.inProgress = false;
    } else if (req.body.action === 'deliver') {
      order.isDelivered = true;
    } else if (req.body.action === 'cancel') {
      order.isCanceled = true;
    }
    await order.save();
    res.send({ message: 'Done' });
  } else {
    req.status(404).message('Order not found');
  }
});
app.get('/api/orders/queue', async (req, res) => {
  const inProgressOrders = await Order.find(
    { inProgress: true, isCanceled: false },
    'number'
  );
  const servingOrders = await Order.find(
    { isReady: true, isDelivered: false },
    'number'
  );
  res.send({ inProgressOrders, servingOrders });
});
app.delete('/api/orders/:id', async (req, res) => {
  const order = await Order.findByIdAndDelete(req.params.id);
  res.send(order);
});
app.use(express.static(path.join(__dirname, '/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`serve at http://localhost:${port}`));
