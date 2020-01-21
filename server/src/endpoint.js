const { database } = require('./db');
const LIMIT_MAX = 500;

module.exports.endpoint = {
  getByTitle({ title }) {
    return new Promise((res, rej) => database.all(
      `SELECT * FROM movies WHERE primaryTitle LIKE $title or originalTitle LIKE $title LIMIT ${LIMIT_MAX}`,
      { $title: `${title}%` },
      (err, rows) => err ? rej(err) : res(rows)
    ));
  },
  update({ id, input: { originalTitle, primaryTitle, startYear, genres } }) {
    return new Promise((res, rej) => database.run(
      `UPDATE movies SET originalTitle=$originalTitle, primaryTitle=$primaryTitle, startYear=$startYear, genres=$genres WHERE id=$id`,
      { $id: id, $originalTitle: originalTitle, $primaryTitle: primaryTitle, $startYear: startYear, $genres: genres },
      err => (err ? rej(err) : res({ id, originalTitle, primaryTitle, startYear, genres }))
    ));
  }
}
