const express = require('express');
const orderRoutes = require('./routes/orders');
const db = require('./db');
const app = express();

app.use(express.json());

// Routes
app.use('/', orderRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'Order Service is running' });
});

// Only start the server if not in test mode
if (require.main === module) {
  const PORT = process.env.PORT || 8001;
  app.listen(PORT, () => {
    console.log(`Order Service running on port ${PORT}`);
  });
}

// Export for testing
module.exports = app;
