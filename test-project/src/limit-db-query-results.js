import mysql from "mysql2";

// Compliant
let query = "SELECT * FROM customers LIMIT 10";
query = "SELECT TOP 5 * FROM products";
query = "SELECT * FROM orders FETCH FIRST 20 ROWS ONLY";
query =
  "WITH numbered_customers AS (SELECT *, ROW_NUMBER() OVER (ORDER BY customer_id) AS row_num FROM customers) SELECT * FROM numbered_customers WHERE row_num <= 50";

// Non-compliant
query = "SELECT id FROM bikes";

// Sample to execute the query
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "test",
});
connection.query(query, function (_, results, fields) {
  console.log(results);
  console.log(fields);
});
