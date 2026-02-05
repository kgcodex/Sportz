import "dotenv/config";

export const PORT = process.env.PORT;
export const DB_URL = process.env.DATABASE_URL;

if (!DB_URL) {
  throw new Error("Database URL is required.");
}
