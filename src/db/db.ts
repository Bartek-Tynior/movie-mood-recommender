import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

// Create MySQL connection
const connection = await mysql.createConnection({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT, 10) : undefined,
  user: process.env.DATABASE_USER,
  database: process.env.DATABASE_NAME,
});

// Initialize Drizzle
export const db = drizzle(connection);
