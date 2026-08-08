import mysql from "mysql2";

// Sample to execute the query
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "test",
});

// Compliant
connection.query("SELECT * FROM customers LIMIT 10");
connection.query("SELECT TOP 5 * FROM products");
connection.query("SELECT * FROM orders FETCH FIRST 20 ROWS ONLY");
connection.query(
  "WITH numbered_customers AS (SELECT *, ROW_NUMBER() OVER (ORDER BY customer_id) AS row_num FROM customers) SELECT * FROM numbered_customers WHERE row_num <= 50",
);

// Non-compliant
connection.query("SELECT id FROM bikes");
