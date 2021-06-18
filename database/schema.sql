DROP DATABASE IF EXISTS test;

CREATE DATABASE test;
\c test;
DROP TABLE IF EXISTS sample;
CREATE TABLE sample
(
    id serial NOT NULL,
    count integer,
    val text,
    PRIMARY KEY (id)
);

-- C:\Users\senadmin\WebApps\sensor-internal-v1\database\schema.sql
