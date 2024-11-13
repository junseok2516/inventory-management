
CREATE DATABASE IF NOT EXISTS inventory_management;

USE inventory_management;

CREATE TABLE IF NOT EXISTS Book_Inventory (
	entry_id INT AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    genre VARCHAR(255),
    publication_date DATE,
    isbn VARCHAR(255) UNIQUE NOT NULL,
    PRIMARY KEY(entry_id)
);


