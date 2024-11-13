const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const { createObjectCsvWriter } = require('csv-writer');
const { Parser } = require('json2csv');

const app = express();
const port = 3000;

// Connect MySQL DB (user and password are dependent)
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'inventory_management'
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create a new book
app.post('/books', (req, res) => {
    const { title, author, genre, publication_date, isbn } = req.body;
    const query = `INSERT INTO Book_Inventory (title, author, genre, publication_date, isbn) VALUES (?, ?, ?, ?, ?)`;

    db.execute(query, [title, author, genre, publication_date, isbn], (err, result) => {
        if (err) {
            return res.status(500).send({ message: 'Error adding book', error: err });
        }
        res.status(201).send({ message: 'Book added successfully', id: result.insertId });
    });
});

// Filter books based on title, author, or genre
app.get('/books', (req, res) => {
    const { title, author, genre } = req.query;
    let query = 'SELECT * FROM Book_Inventory WHERE 1=1';
    const params = [];

    if (title) {
        query += ' AND title LIKE ?';
        params.push(`%${title}%`);
    }
    if (author) {
        query += ' AND author LIKE ?';
        params.push(`%${author}%`);
    }
    if (genre) {
        query += ' AND genre LIKE ?';
        params.push(`%${genre}%`);
    }

    db.execute(query, params, (err, result) => {
        if (err) {
            return res.status(500).send({ message: 'Error fetching books', error: err });
        }
        res.status(200).json(result || []);
    });
});

// Export book data as CSV
app.get('/export/csv', (req, res) => {
    db.execute('SELECT * FROM Book_Inventory', (err, result) => {
        if (err) {
            return res.status(500).send({ message: 'Error fetching books for export', error: err });
        }

        const csvWriter = createObjectCsvWriter({
            path: 'books_inventory.csv',
            header: [
                { id: 'id', title: 'ID' },
                { id: 'title', title: 'Title' },
                { id: 'author', title: 'Author' },
                { id: 'genre', title: 'Genre' },
                { id: 'publication_date', title: 'Publication Date' },
                { id: 'isbn', title: 'ISBN' }
            ]
        });

        csvWriter.writeRecords(result)
            .then(() => {
                res.download('books_inventory.csv');
            })
            .catch(err => {
                res.status(500).send({ message: 'Error generating CSV', error: err });
            });
    });
});

// Export book data as JSON
app.get('/export/json', (req, res) => {
    db.execute('SELECT * FROM Book_Inventory', (err, result) => {
        if (err) {
            return res.status(500).send({ message: 'Error fetching books for export', error: err });
        }
        res.json(result);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
