const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'genres.json');

const getGenres = () => {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
};

const saveGenres = (genres) => {
    fs.writeFileSync(filePath, JSON.stringify(genres, null, 2));
};

module.exports = { getGenres, saveGenres };
