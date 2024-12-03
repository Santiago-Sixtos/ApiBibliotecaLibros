const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'genres.json');

const getGenres = () => {
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

const saveGenres = (genres) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, JSON.stringify(genres, null, 2), (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

module.exports = { getGenres, saveGenres };

