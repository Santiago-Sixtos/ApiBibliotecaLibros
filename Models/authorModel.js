const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'authors.json');

const getAuthors = () => {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
};

const saveAuthors = (authors) => {
    fs.writeFileSync(filePath, JSON.stringify(authors, null, 2));
};

module.exports = { getAuthors, saveAuthors };
