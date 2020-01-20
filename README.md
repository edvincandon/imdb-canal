# IMDB Canal+
#### Setup 
Data processing and simple graphQL server via docker
```shell
make server-build
make server-up
```
> verify : http://localhost:8080/graphql/graphiql

Run angular app :
```shell
cd app && ng serve
```

#### Prérequis
> Le test devra être réalisé sous Angular 6 ou +, le choix des modules complémentaires est libre, le back-end et la persistance des données n’est pas nécessaire pour ce test. L’aspect de l’IHM est libre mais se doit d’être à minima ergonomique.
#### Sujet
> Nous souhaitons réaliser une page web nous permettant d’effectuer une recherche simple sur le titre ( « primaryTitle » et « originalTitle » ) ainsi qu’un filtre sur l’année de création. Les résultats devront être affiché sous forme de tableau avec les informations « originalTitle », « startYear » et
« genre », depuis ce tableau, nous aimerions pouvoir modifier le titre, l’année et le genre via une pop-up.
Le jeu de données utilisé pour ce test sera le suivant : https://datasets.imdbws.com/title.basics.tsv.gz Le jeu de données peut être converti au préalable dans le format que vous souhaitez.