const path = require('path');
const mysql = require('mysql2/promise');
const { getAuthors } = require('./Models/authorModel');
const { getBooks } = require('./Models/bookModel');
const { getGenres } = require('./Models/genreModel');
require('dotenv').config({ path: path.resolve(__dirname, 'Direcciones.env') }); 

const main = async () => {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT
    });

    // Insert authors
    const authors = await getAuthors();
    for (const author of authors) {
        await connection.execute('INSERT INTO authors (id, name, bio) VALUES (?, ?, ?)', [author.id, author.name, author.bio]);
    }

    // Insert books
    const books = await getBooks();
    for (const book of books) {
        await connection.execute('INSERT INTO books (id, title, author_id, genre_id, published_year, description) VALUES (?, ?, ?, ?, ?, ?)', 
        [book.id, book.title, book.author_id, book.genre_id, book.published_year, book.description]);
    }

    // Insert genres
    const genres = await getGenres();
    for (const genre of genres) {
        await connection.execute('INSERT INTO genres (id, name) VALUES (?, ?)', [genre.id, genre.name]);
    }

    console.log('Datos insertados con éxito');
    await connection.end();
};

main().catch(err => console.error('Error insertando datos:', err));
