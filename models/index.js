// Setting up the database connection
const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST || 'localhost',
		port: process.env.DB_PORT || 3306,
		user: process.env.DB_USER || 'gallery',
		password: process.env.DB_PASSWORD || '',
		database: process.env.DB_NAME || 'gallery',
    }
  });

const bookshelf = require('bookshelf')(knex);


const Album = bookshelf.model('Album', {
    tableName: 'albums',
    photos() {
        return this.belongsToMany('Photo')
    }
});


const Photo = bookshelf.model('Photo', {
    tableName: 'photos',
    albums() {
        return this.belongsToMany('Album');
    }
});

// const User = bookshelf.model('User', {
//     tableName: 'users',
//     albums() {
//         return this.belongsToMany('album');
//     }
// });

module.exports = {
    bookshelf,
    Album,
    Photo,
};