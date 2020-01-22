FROM alpine:3.10

ENV DB_NAME="/app/movies.db"

RUN apk add --update sqlite npm
RUN mkdir -p /app/server
WORKDIR /app

RUN wget https://datasets.imdbws.com/title.basics.tsv.gz
RUN gzip -d title.basics.tsv.gz

# clean-up tsv file to be sqlite compliant
RUN sed -i "1d; s/^..//; s/'/\'/g;" ./title.basics.tsv
RUN sed -i 's/"/\\"/g' ./title.basics.tsv

# set to mode tabs to handle tsv correctly
RUN touch ~/.sqliterc
RUN echo ".mode tabs" > ~/.sqliterc

# create db and source it
# + index database for faster queries
# check : explain query plan select * from movies where primaryTitle like 'test%' or originalTitle like 'test%'
RUN sqlite3 movies.db 'CREATE TABLE movies (id INTEGER PRIMARY KEY, titleType text, primaryTitle text, originalTitle text, isAdult text, startYear text, endYear text, runtimeMinutes text, genres text);'
RUN sqlite3 movies.db '.import title.basics.tsv movies'
RUN sqlite3 movies.db 'CREATE INDEX primaryTitle_index ON movies (primaryTitle COLLATE NOCASE);'
RUN sqlite3 movies.db 'CREATE INDEX originalTitle_index ON movies (originalTitle COLLATE NOCASE);'
RUN sqlite3 movies.db 'UPDATE movies SET startYear = NULL WHERE startYear = "\N";'
RUN sqlite3 movies.db 'UPDATE movies SET genres = NULL WHERE genres = "\N";'

RUN chmod 644 movies.db

COPY ./package*.json /app/server/
RUN cd server && npm install

ENTRYPOINT ["node", "server/src/index.js"]