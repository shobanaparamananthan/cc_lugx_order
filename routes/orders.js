const express = require('express');
const router = express.Router();
const db = require('../db');

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
