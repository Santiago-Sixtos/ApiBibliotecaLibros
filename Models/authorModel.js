const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'authors.json');

const getAuthors = () => {
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

const saveAuthors = (authors) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, JSON.stringify(authors, null, 2), (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

module.exports = { getAuthors, saveAuthors };
