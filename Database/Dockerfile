FROM postgres:latest

COPY ./init.sql /docker-entrypoint-initdb.d/

ENV POSTGRES_DB=server_db
ENV POSTGRES_USER=admin
ENV POSTGRES_PASWORD=postgres12
ENV POSTGRES_INITDB_ARGS="--encoding=UTF-8"
ENV ALLOW_IP_RANGE=0.0.0.0/0


EXPOSE 5432

