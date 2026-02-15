const mysql = require('mysql2');
require('dotenv').config();

let db = null;
let isConnected = false;

try {
  db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'fullstackdb',
  });

  db.connect((error) => {
    if (error) {
      console.warn('⚠️  Database connection failed:', error.message);
      console.warn('📝 Update .env file with your MySQL credentials');
      isConnected = false;
      return;
    }
    console.log('✓ Connected to MySQL database');
    isConnected = true;
  });
} catch (err) {
  console.warn('⚠️  Database setup error:', err.message);
}

module.exports = db;
