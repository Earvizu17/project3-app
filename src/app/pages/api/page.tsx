// db.js
import { Pool } from "pg";

const pool = new Pool({
  user: "your_user",
  host: "localhost",
  database: "your_database",
  password: "your_password",
  port: 5432, // Default PostgreSQL port
});

const db = {
  query: (text, params) => pool.query(text, params),
};

export default db;

