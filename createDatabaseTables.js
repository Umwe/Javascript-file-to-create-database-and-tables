const mysql = require('mysql2');

// Create a connection to the MySQL server
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'player11',
  database: 'mysql',
});

// Connect to the MySQL server
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }

  console.log('Connected to MySQL server');

  // Create a new database
  const createDatabaseQuery = 'CREATE DATABASE IF NOT EXISTS mydatabase';
  connection.query(createDatabaseQuery, (err, results) => {
    if (err) {
      console.error('Error creating database:', err);
      return connection.end();
    }

    console.log('Database created or already exists');

    // Switch to the newly created database
    connection.changeUser({ database: 'mydatabase' }, (err) => {
      if (err) {
        console.error('Error switching to database:', err);
        return connection.end();
      }

      // Create tables
      const createTable1Query = `
        CREATE TABLE IF NOT EXISTS table1 (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL
        )
      `;

      const createTable2Query = `
        CREATE TABLE IF NOT EXISTS table2 (
          id INT AUTO_INCREMENT PRIMARY KEY,
          description TEXT
        )
      `;

      const createTable3Query = `
        CREATE TABLE IF NOT EXISTS table3 (
          id INT AUTO_INCREMENT PRIMARY KEY,
          value DECIMAL(10, 2) NOT NULL
        )
      `;

      connection.query(createTable1Query, (err) => {
        if (err) {
          console.error('Error creating table1:', err);
        } else {
          console.log('Table1 created or already exists');
        }
      });

      connection.query(createTable2Query, (err) => {
        if (err) {
          console.error('Error creating table2:', err);
        } else {
          console.log('Table2 created or already exists');
        }
      });

      connection.query(createTable3Query, (err) => {
        if (err) {
          console.error('Error creating table3:', err);
        } else {
          console.log('Table3 created or already exists');
        }

        // Close the connection
        connection.end();
      });
    });
  });
});
