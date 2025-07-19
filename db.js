const mysql = require('mysql2');
const config = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'orderdb',
};

const connection = mysql.createConnection(config);

connection.connect(err => {
  if (err) {
    console.error('DB connection failed:', err.stack);
    return;
  }
  console.log('✅ Connected to MySQL!');
});

module.exports = connection;