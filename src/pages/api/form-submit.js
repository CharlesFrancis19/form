// pages/api/form-submit.js

import { createConnection } from 'mysql2';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { email, password } = req.body;

  const connection = createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'u673206465_charles',
    password: 'v.fij4JCi7AgBPn',
    database: 'u673206465_form',
  });

  connection.connect();

  const tableName = 'details'; // Replace with your actual table name

  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS ${tableName} (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL
    )
  `;

  const insertDataQuery = `INSERT INTO ${tableName} (email, password) VALUES (?, ?)`;

  connection.query(createTableQuery, (createTableError) => {
    if (createTableError) {
      console.error('Error creating table:', createTableError);
      connection.end();
      return res.status(500).json({ error: 'Error creating table' });
    }

    connection.query(insertDataQuery, [email, password], (insertError, results) => {
      connection.end();

      if (insertError) {
        console.error('Error inserting into database:', insertError);
        return res.status(500).json({ error: 'Error inserting into database' });
      }

      return res.status(200).json({ success: true });
    });
  });
}
