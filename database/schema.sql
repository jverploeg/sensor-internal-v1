-- development version(change to production when stable)

-- drop database for repetitive imports during development/debugging

-- do we want to do this if we want to be user senadmin???
-- or does env login/ db connection via pg-pool solve this potential issue?
-- TODO: figure out if this is issue...

--DROP DATABASE IF EXISTS senadmin;
-- ERROR:  cannot drop the currently open database
-- ERROR:  database "senadmin" already exists


-- create database
CREATE DATABASE IF NOT EXISTS senadmin;
-- switch to this database
\c senadmin;

-- create tables
-- cascade allows subsequent dropping on tables with master dependencies

-- TODO: rename column names to match .xlsx file for ETL convenience

DROP TABLE IF EXISTS char CASCADE;
CREATE TABLE char
(
    char_id integer GENERATED ALWAYS AS IDENTITY,
    char_code varchar NOT NULL,
    title  varchar NOT NULL,
    description varchar NOT NULL,
    description_path varchar NOT NULL, --revise/reformat this on extraction?
    image_path varchar NOT NULL, 
    -- revision varchar NOT NULL, no revision?
    PRIMARY KEY (char_id)
);

DROP TABLE IF EXISTS housing CASCADE;
CREATE TABLE housing
(
    housing_id integer GENERATED ALWAYS AS IDENTITY,
    housing_code varchar NOT NULL,
    title  varchar NOT NULL,
    -- description varchar NOT NULL, not used
    image_path varchar NOT NULL,
    mech_path varchar, --if null/empty -> 'x'
    revision varchar NOT NULL,
    PRIMARY KEY (housing_id)
);

-- insert sample data for testing
-- GENERATED ALWAYS AS IDENTITY WILL AUTO GENERATE THE ID. YOU CANNOT INSERT OR UPDATE
-- IF NEEDED TO MODIFY ID, CHANGE TO GENERATED BY DEFAULT AS IDENTITY
INSERT INTO char (char_code, title, description, description_path, image_path)
VALUES
    ('EHS1', 'HS Hall or Magneto Resistive Switch Sensor', 'Sensitive Either Pole Hall Switch, 38 G', 'EHS1.html', 'EHS1-Model.png') --, if multiple lines
;


INSERT INTO housing (housing_code, title, image_path, mech_path, revision)
VALUES
    ('ALUM', 'Aluminum Housings start with A', 'ALUM-Model.png', 'x', 'A') --,
;

-- C:\Users\senadmin\WebApps\sensor-internal-v1\database\schema.sql
