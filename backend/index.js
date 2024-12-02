const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const app = express();
const port = process.env.PORT || 5000;
const bookRoutes = require('./src/books/book.route');
const orderRoutes = require ("./src/orders/order.route");
// Load environment variables
dotenv.config();

// Middleware:
app.use(express.json()); 

// CORS configuration:
app.use(cors({
  origin: 'http://localhost:5173',  // Ensure no space before the URL
  credentials: true  // Allow credentials (cookies, HTTP authentication, etc.)
}));

// Route: Book routes
app.use("/api/books", bookRoutes);

//Route: order routes 
app.use("/api/orders", orderRoutes)

// Root route (before DB connection)
app.use("/", (req, res) => {
  res.send("BookStore Server is running!");
});

// MongoDB connection:
async function main() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Mongodb connected successfully!");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}

// Start the server
main().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
