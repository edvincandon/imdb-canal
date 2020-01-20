const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Movie {
    id: ID!
    primaryTitle: String
    originalTitle: String
    startYear: String
    genres: String
  }

  type Query {
    getByTitle(title: String): [Movie]
  }
`);

module.exports.Movie = schema;



