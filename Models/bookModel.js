const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'books.json');

const getBooks = async () => {
    const data = await fs.readFileSync(filePath);
    return JSON.parse(data);
};

const saveBooks = async (books) => {
    await fs.writeFileSync(filePath, JSON.stringify(books, null, 2));
};

module.exports = { getBooks, saveBooks };

