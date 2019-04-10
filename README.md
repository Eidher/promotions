# BCGDV

## Pre requirements

`Docker` must be installed in your computer. [https://www.docker.com/](https://www.docker.com/)

## Code scaffolding

There are 2 main foldes `client` with the client side (frontend) files and `server` with the backend service (api) files

## Build and run

```shell
$ git clone --recursive https://github.com/Eidher/promotions
$ cd promotions/docker/
$ docker-compose up -d
```

When finished got to your browser (Chrome) and access the url [http://localhost:2080](http://localhost:2080).

If you need to change the port number, go to docker folder and modify `.env` file and run `docker-compose up -d` again.

## Known Issues

If you have problmes accesing the website or there ar no products avalible, check that you have two containers with names `docker_databas_1` and `docker_web_1` running:

```shell
$ docker ps
```

If you don't have both containers running or one is missing, run:

```shell
$ docker-compose down
```

and then

```shell
$ docker-compose down
```

again inside the `docker` folder.

---

## Author

Eidhe Escalon
eidher.escalona@gmail.com
