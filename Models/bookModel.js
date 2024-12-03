const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'books.json');

const getBooks = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
};

const saveBooks = (books) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, JSON.stringify(books, null, 2), (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

module.exports = { getBooks, saveBooks };

