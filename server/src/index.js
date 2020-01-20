const Koa = require('koa');
const mount = require('koa-mount');
const graphqlHTTP = require('koa-graphql');
const { Movie } = require('./model/schema');
const { endpoint } = require('./endpoint');

const server = new Koa();

server.use(mount('/graphql', graphqlHTTP({
  schema: Movie,
  rootValue: endpoint,
  graphiql: true
})));

server.listen(8080);
