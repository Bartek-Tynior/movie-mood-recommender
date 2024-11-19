import { mysqlTable, serial, varchar, text, int, json } from "drizzle-orm/mysql-core";

export const savedMovies = mysqlTable("saved_movies", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 255 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  year: int("year").notNull(),
  rating: int("rating").notNull(),
  poster: varchar("poster", { length: 255 }).notNull(),
  genres: json("genres"),
});
