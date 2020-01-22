# IMDB Canal+
#### Setup 
Data processing and simple graphQL server via docker :
```shell
# wait for it.. cleaning and indexing the DB is slow 👀
make server-build
make server-up
```
> verify : http://localhost:8080/graphql/graphiql

Run angular app :
```shell
cd app && ng serve
```
