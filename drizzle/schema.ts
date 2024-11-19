import { mysqlTable, mysqlSchema, AnyMySqlColumn, primaryKey, unique, serial, varchar, text, int, json } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const savedMovies = mysqlTable("saved_movies", {
	id: serial().notNull(),
	userId: varchar("user_id", { length: 255 }).notNull(),
	title: varchar({ length: 255 }).notNull(),
	description: text(),
	year: int().notNull(),
	rating: int().notNull(),
	poster: varchar({ length: 255 }).notNull(),
	genres: json(),
},
(table) => {
	return {
		savedMoviesId: primaryKey({ columns: [table.id], name: "saved_movies_id"}),
		id: unique("id").on(table.id),
	}
});
