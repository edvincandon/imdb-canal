server-build:
	docker build -t canal-imdb-server ./server
server-up:
	docker run -v "${PWD}/server:/app/server" -v /app/server/node_modules -p 8080:8080/tcp -it canal-imdb-server /bin/sh
