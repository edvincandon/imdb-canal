const { database } = require('./db');

module.exports.endpoint = {
  getByTitle({ title }) {
    return new Promise((res, rej) => database.all(
      'SELECT * FROM movies WHERE primaryTitle LIKE $title or originalTitle LIKE $title LIMIT 500',
      { $title: `${title}%` },
      (err, rows) => err ? rej(err) : res(rows)
    ));
  }
}
