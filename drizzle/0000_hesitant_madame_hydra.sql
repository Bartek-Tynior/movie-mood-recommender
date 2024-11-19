CREATE TABLE `saved_movies` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`year` int NOT NULL,
	`rating` int NOT NULL,
	`poster` varchar(255) NOT NULL,
	CONSTRAINT `saved_movies_id` PRIMARY KEY(`id`)
);
