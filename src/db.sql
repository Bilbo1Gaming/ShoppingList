-- ======================== CREATES ========================

-- CREATE TABLE IF NOT EXISTS

-- items
CREATE TABLE IF NOT EXISTS `items` (`id` TEXT PRIMARY KEY UNIQUE NOT NULL, `name` TEXT NOT NULL, `created` TEXT NOT NULL, `modified` TEXT NOT NULL, `user` TEXT NOT NULL REFERENCES `users`(`id`), `quantity` REAL, `extra` TEXT, `pic` TEXT, `shop` TEXT, `in_cart` INTEGER NOT NULL, `purchased` INTEGER NOT NULL, `list` TEXT NOT NULL REFERENCES `lists`(`id`))

-- users 
CREATE TABLE IF NOT EXISTS `users` (`id` TEXT UNIQUE NOT NULL, `name` TEXT NOT NULL, `email` TEXT NOT NULL)

-- lists
CREATE TABLE IF NOT EXISTS `lists` (`id` TEXT UNIQUE NOT NULL, `name` TEXT NOT NULL, `completed` INTEGER NOT NULL)