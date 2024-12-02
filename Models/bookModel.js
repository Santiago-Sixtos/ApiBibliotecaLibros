const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'books.json');

const getBooks = () => {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
};

const saveBooks = (books) => {
    fs.writeFileSync(filePath, JSON.stringify(books, null, 2));
};

module.exports = { getBooks, saveBooks };

