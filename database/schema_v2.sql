-- create database
CREATE DATABASE IF NOT EXISTS sensors;
-- switch to this database
\c sensors;

-- create tables
-- cascade allows subsequent dropping on tables with master dependencies
----------HOUSING----------------
DROP TABLE IF EXISTS housing CASCADE;
CREATE TABLE housing
(
    housing_id          integer GENERATED ALWAYS AS IDENTITY,
    housing_code        varchar UNIQUE,
    part_number         varchar,
    rev                 varchar,
    Title               varchar,
    web_valid           varchar,
    png_file            varchar,
    mech_file           varchar,
    PRIMARY KEY (housing_id, housing_code)
);
DROP INDEX if EXISTS housing_key;
CREATE INDEX housing_key ON housing (housing_code);
copy housing (housing_code, part_number, rev, Title, web_valid, png_file, mech_file) from 'D:\DATA\Sensor\webApp\csv_files\v4\housing.csv'  delimiter ',' csv header;
----------------------------------

----------CHAR--------------------
DROP TABLE IF EXISTS char CASCADE;
CREATE TABLE char
(
    char_id             integer GENERATED ALWAYS AS IDENTITY,
    char_code           varchar UNIQUE,
    Title               varchar NOT NULL,
    Type                varchar NOT NULL,
    Type_Description    varchar NOT NULL,
    Web_Valid           varchar NOT NULL,
    Bullet_file         varchar NOT NULL,
    PRIMARY KEY (char_id, char_code)
);
DROP INDEX if EXISTS char_key;
CREATE UNIQUE INDEX char_key ON char (char_code);
copy char (char_code, Title, Type, Type_Description, Web_Valid, Bullet_file) from 'D:\DATA\Sensor\webApp\csv_files\v4\char.csv'  delimiter ',' csv header;




----------------------------------

----------OPTION--------------------
DROP TABLE IF EXISTS option CASCADE;
CREATE TABLE option
(
    option_id           integer GENERATED ALWAYS AS IDENTITY,
    option_code         varchar UNIQUE,
    Title               varchar NOT NULL,
    web_valid           varchar,
    png_file            varchar NOT NULL,
    PRIMARY KEY (option_id, option_code)
);
DROP INDEX if EXISTS option_key;
CREATE INDEX option_key ON option (option_code);
copy option (option_code, Title, web_valid, png_file) from 'D:\DATA\Sensor\webApp\csv_files\v4\option.csv'  delimiter ',' csv header;
----------------------------------

----------CHAR OPTION--------------------
DROP TABLE IF EXISTS char_op CASCADE;
CREATE TABLE char_op
(
    char_op_id          integer GENERATED ALWAYS AS IDENTITY,
    char_op_code        varchar UNIQUE,
    option_code         varchar,
    rev                 varchar,
    Title               varchar NOT NULL,
    web_valid           varchar,
    png_file            varchar NOT NULL,
    PRIMARY KEY (char_op_id, char_op_code)
);
DROP INDEX if EXISTS char_op_key;
CREATE INDEX char_op_key ON char_op (char_op_code);
copy char_op (char_op_code, option_code, rev, Title, web_valid, png_file) from 'D:\DATA\Sensor\webApp\csv_files\v4\char_op.csv'  delimiter ',' csv header;
----------------------------------

----------CONNECTION--------------------
DROP TABLE IF EXISTS connection CASCADE;
CREATE TABLE connection
(
    connection_id       integer GENERATED ALWAYS AS IDENTITY,
    connection_code     varchar,
    web_code            varchar,-- UNIQUE, Failing row contains (425, CX6, null, x, Binder USA cable # 79 9003 12 04, no, none taken, null).
    rev                 varchar,
    Title               varchar,
    web_valid           varchar,
    part_number         varchar,
    png_file            varchar,
    PRIMARY KEY (connection_id)
);
DROP INDEX if EXISTS connection_key;
CREATE INDEX connection_key ON connection (connection_id);
copy connection (connection_code, web_code, rev, Title, web_valid, part_number, png_file) from 'D:\DATA\Sensor\webApp\csv_files\v4\connection.csv'  delimiter ',' csv header;

----------------------------------

----------SENSOR-------------------
DROP TABLE IF EXISTS sensor CASCADE;
CREATE TABLE sensor
(
    sensor_id           integer GENERATED ALWAYS AS IDENTITY,
    sensor_code         varchar UNIQUE,
    part_number         varchar,
    rev                 varchar,
    Title               varchar NOT NULL,
    char                varchar,
    type                varchar,
    wizard_part         varchar,
    PRIMARY KEY (sensor_id, sensor_code)
);
DROP INDEX if EXISTS sensor_key;
CREATE INDEX sensor_key ON sensor (sensor_code);
copy sensor (sensor_code, part_number, rev, Title, char, type, wizard_part) from 'D:\DATA\Sensor\webApp\csv_files\v4\catalog.csv'  delimiter ',' csv header;
----------------------------------

----------CUSTOM--------------------
DROP TABLE IF EXISTS custom CASCADE;
CREATE TABLE custom
(
    custom_id           integer GENERATED ALWAYS AS IDENTITY,
    custom_sensor_code  varchar,
    part_number         varchar UNIQUE,
    rev                 varchar,
    Title               varchar,
    type                varchar,
    housing             varchar,
    char                varchar,
    option              varchar,
    connection          varchar,
    conn_chart          varchar,
    spec_chart          varchar,
    picture             varchar,

    PRIMARY KEY (custom_id, part_number)
);
DROP INDEX if EXISTS custom_key;
CREATE INDEX custom_key ON custom (part_number);
copy custom (custom_sensor_code, part_number, rev, Title, type, housing, char, option, connection, conn_chart, spec_chart, picture) from 'D:\DATA\Sensor\webApp\csv_files\v4\custom.csv'  delimiter ',' csv header;-- encoding 'latin1';

----------------------------------

----------XPROTO--------------------
DROP TABLE IF EXISTS xproto CASCADE;
CREATE TABLE xproto
(
    xproto_id           integer GENERATED ALWAYS AS IDENTITY,
    xproto_code         varchar, -- UNIQUE,
    xproto_part_number  varchar UNIQUE, -- deleted/modified duplicates -> multiple entries with variations...
    rev                 varchar,
    Description         varchar, -- NOT NULL,
    notes               varchar,
    housing             varchar,
    char                varchar,
    opt                 varchar,
    connection          varchar,
    PRIMARY KEY (xproto_id)--, part_number) --, custom_sensor_code)
);
DROP INDEX if EXISTS xproto_key;
CREATE INDEX xproto_key ON xproto (xproto_part_number);
copy xproto (xproto_code, xproto_part_number, rev, Description, notes, housing, char, opt, connection) from 'D:\DATA\Sensor\webApp\csv_files\v4\xproto.csv'  delimiter ',' csv header encoding 'latin1';
----------------------------------------




--https://trineo.com/blog/2018/08/using-copy-in-postgres-for-importing-large-csvs