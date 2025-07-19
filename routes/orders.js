const express = require('express');
const router = express.Router();
const db = require('../db');

// Automatically create the `orders` table if it doesn't exist
const createOrdersTable = `
  CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(100),
    games VARCHAR(255),
    total_price DECIMAL(10, 2)
  )
`;

db.query(createOrdersTable, (err, result) => {
  if (err) {
    console.error(' Failed to create orders table:', err);
  } else {
    console.log(' Orders table is ready or already exists');
  }
});

// Health check
router.get('/health', (req, res) => {
  res.send({ status: 'Order Service is running' });
});

// Create an order
router.post('/orders', (req, res) => {
  const { customer_name, games, total_price } = req.body;
  const sql = 'INSERT INTO orders (customer_name, games, total_price) VALUES (?, ?, ?)';
  db.query(sql, [customer_name, games, total_price], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'Order created', id: result.insertId });
  });
});

// Get all orders
router.get('/orders', (req, res) => {
  db.query('SELECT * FROM orders', (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
});

module.exports = router;
