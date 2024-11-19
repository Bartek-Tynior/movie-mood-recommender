import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "mysql", // Database dialect
  schema: "./src/db/schema.ts", // Path to schema file
  out: "./drizzle", // Output directory
  dbCredentials: {
    host: process.env.DATABASE_HOST || "localhost",
    port: process.env.DATABASE_PORT
      ? parseInt(process.env.DATABASE_PORT, 10)
      : undefined,
    user: process.env.DATABASE_USER || "root",
    database: process.env.DATABASE_NAME || "drizzle",
  },
});
