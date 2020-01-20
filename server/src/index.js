const Koa = require('koa');
const cors = require('@koa/cors');
const mount = require('koa-mount');
const graphqlHTTP = require('koa-graphql');
const { Movie } = require('./model/schema');
const { endpoint } = require('./endpoint');

const server = new Koa();

server.use(cors());

server.use(mount(
  '/graphql',
  graphqlHTTP({
    schema: Movie,
    rootValue: endpoint,
    graphiql: true
  })
));

server.listen(8080);
