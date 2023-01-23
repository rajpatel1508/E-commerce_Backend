//module import
const express = require("express");
const env = require("dotenv");
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

//Routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')
const cartRoutes = require('./routes/cart')
const initialDataRoutes = require('./routes/admin/initialData');
const pageRoutes = require('./routes/admin/page');
const addressRoutes = require("./routes/address");
const orderRoutes = require("./routes/order");
const adminOrderRoute = require("./routes/admin/order.routes");

//Environment variable config
env.config();

//Mongoose connection
mongoose.connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Database connected");
});

//Middleware to parse json data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());
app.use('/public', express.static(path.join(__dirname, 'uploads')));

//Prefixing routes with /api
app.use('/api', authRoutes);
app.use('/api', adminRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);
app.use('/api', initialDataRoutes);
app.use('/api', pageRoutes);
app.use("/api", addressRoutes);
app.use("/api", orderRoutes);
app.use("/api", adminOrderRoute);

//Server port config
app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`);
});