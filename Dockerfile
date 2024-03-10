FROM mysql:latest

ENV MYSQL DATABASE=blog_db
ENV MYSQL_ROOT_PASSWORD=root_password

ENV MYSQL_USER=blog_user
ENV MYSQL_PASSWORD=blog_password

COPY schema.sql ./docker-entrypoint-initdb.d/

EXPOSE  3306
