const express = require('express');
const app = express();
const ordersRouter = require('./routes/orders');
require('dotenv').config();

app.use(express.json());
app.use('/', ordersRouter);

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => console.log(` Order Service running on port ${PORT}`));
