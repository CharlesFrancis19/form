// pages/api/form-submit.js

import { createConnection } from 'mysql';

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

  const query = 'INSERT INTO your_table_name (email, password) VALUES (?, ?)';

  connection.query(query, [email, password], (error, results) => {
    connection.end();

    if (error) {
      console.error('Error inserting into database:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    return res.status(200).json({ success: true });
  });
}
