const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Movie {
    id: ID!
    primaryTitle: String
    originalTitle: String
    startYear: String
    genres: String
  }

  input MovieInput {
    primaryTitle: String
    originalTitle: String
    startYear: String
    genres: String
  }

  type Query {
    getByTitle(title: String): [Movie]
  }

  type Mutation {
    update(id: ID!, input: MovieInput): Movie
  }
`);

module.exports.Movie = schema;



