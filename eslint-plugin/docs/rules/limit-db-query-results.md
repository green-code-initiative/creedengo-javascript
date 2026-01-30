# @creedengo/limit-db-query-results

📝 Should limit the number of returns for a SQL query.

⚠️ This rule _warns_ in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

## Why is this an issue?

SQL queries often involve processing large amounts of data, and fetching a large number of rows can consume significant
CPU resources.
By limiting the number of rows returned, you reduce the amount of processing that needs to be done by the database
engine, which in turn lowers CPU consumption.

Transmitting a large number of rows over a network can be resource-intensive.
By restricting the result set size, you reduce the amount of data that needs to be transferred between the database and
the application, improving network efficiency.

If you store data about customers, you certainly don’t need to retrieve information of all at once, because the larger
the table will be, the more elements the query will return.

```js
// Non-compliant: Direct SQL query without LIMIT
const mysql = require("mysql2");
const connection = mysql.createConnection({ host: "localhost", user: "root" });

connection.query("SELECT * FROM users", (err, results) => {
  if (err) throw err;
  console.log(results);
});
```

It may therefore be a good idea to limit the results and use pagination, for example.

```js
// Compliant: SQL query with LIMIT clause
const mysql = require("mysql2");
const connection = mysql.createConnection({ host: "localhost", user: "root" });

connection.query("SELECT * FROM users LIMIT 10", (err, results) => {
  if (err) throw err;
  console.log(results);
});
```

## Resources

### Documentation

- [MySQL Reference Manual](https://dev.mysql.com/doc/refman/8.0/en/limit-optimization.html) - LIMIT Query Optimization
- [PostgreSQL: Documentation](https://www.postgresql.org/docs/current/queries-limit.html) - LIMIT and OFFSET

### Articles & blog posts

- [Query Performance Optimization](https://www.oreilly.com/library/view/high-performance-mysql/9780596101718/ch04.html)
