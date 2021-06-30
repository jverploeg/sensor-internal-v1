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
    char_id             integer GENERATED ALWAYS AS IDENTITY,
    -- char_code           varchar UNIQUE, 37ads appears twice, maybe delete from excel and come back
    char_code           varchar NOT NULL, --temporary fix for UNIQUE declaration issues
    Title               varchar NOT NULL,
    Type                varchar NOT NULL,
    Type_Description    varchar NOT NULL,
    Web_Valid           varchar NOT NULL,
    png_file            varchar NOT NULL,
    Bullet_file         varchar NOT NULL,
    PRIMARY KEY (char_id)
);
-- DROP INDEX if EXISTS char_key;
-- CREATE UNIQUE INDEX char_key ON char (char_code);
copy char (char_code, Title, Type, Type_Description, Web_Valid, png_file, Bullet_file) from 'D:\DATA\Sensor\webApp\char.csv'  delimiter ',' csv header;





DROP TABLE IF EXISTS option CASCADE;
CREATE TABLE option
(
    option_id           integer GENERATED ALWAYS AS IDENTITY,
    option_code         varchar UNIQUE,
    rev                 varchar,
    Title               varchar NOT NULL,
    web_valid           varchar,
    png_file            varchar NOT NULL,
    output_type         varchar, 
    output_type_2       varchar,
    PRIMARY KEY (option_id, option_code)
);
DROP INDEX if EXISTS option_key;
CREATE INDEX option_key ON option (option_id);
copy option (option_code, rev, Title, web_valid, png_file, output_type, output_type_2) from 'D:\DATA\Sensor\webApp\options.csv'  delimiter ',' csv header;


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
    wires               integer, 
    supply_voltage      varchar,
    PRIMARY KEY (char_op_id)--,
    -- ERROR:  insert or update on table "char_op" violates foreign key constraint "fk_option"
    -- DETAIL:  Key (option_code)=(xx) is not present in table "option"
    -- GMRS-xx	xx	pre	N/A	no	GMRS-xx-Model.png	4
    --TODO: fix this FK issue with xx option codes
    -- CONSTRAINT fk_option FOREIGN KEY ( option_code ) REFERENCES option ( option_code )
    --FOREIGN KEY (option_code)
);
-- DROP INDEX if EXISTS char_op_key;
-- CREATE INDEX char_op_key ON char_op (char_op_id);
copy char_op (char_op_code, option_code, rev, Title, web_valid, png_file, wires, supply_voltage) from 'D:\DATA\Sensor\webApp\char_op.csv'  delimiter ',' csv header;




DROP TABLE IF EXISTS connection CASCADE;
CREATE TABLE connection
(
    connection_id       integer GENERATED ALWAYS AS IDENTITY,
    connection_code     varchar,
    web_code            varchar, --UNIQUE
    rev                 varchar,
    Title               varchar,
    web_valid           varchar,
    part_number         varchar,
    png_file            varchar,
    wires               integer,
    connection_type     varchar,
    wire_guage          varchar,
    length              varchar,
    insulation_material varchar,
    PRIMARY KEY (connection_id) --, connection_code, web_code)
);
-- DROP INDEX if EXISTS connection_key;
-- CREATE INDEX connection_key ON connection (connection_id);
copy connection (connection_code, web_code, rev, Title, web_valid, part_number, png_file, wires, connection_type, wire_guage, length, insulation_material) from 'D:\DATA\Sensor\webApp\connections.csv'  delimiter ',' csv header;

DROP TABLE IF EXISTS housing CASCADE;
CREATE TABLE housing
(
    housing_id          integer GENERATED ALWAYS AS IDENTITY,
    housing_code        varchar, --UNIQUE,
    part_number         varchar, --UNIQUE
    rev                 varchar,
    Title               varchar,
    web_valid           varchar,
    png_file            varchar,
    mech_file           varchar,
    material            varchar,
    mount_type          varchar,
    thread_pitch        varchar,
    length              varchar,
    integral_connector  varchar,
    integral_connector2 varchar,
    PRIMARY KEY (housing_id)--, housing_code)
);
-- DROP INDEX if EXISTS housing_key;
-- CREATE INDEX housing_key ON housing (housing_id);
copy housing (housing_code, part_number, rev, Title, web_valid, png_file, mech_file, material, mount_type, thread_pitch, length, integral_connector, integral_connector2) from 'D:\DATA\Sensor\webApp\housings.csv'  delimiter ',' csv header;





DROP TABLE IF EXISTS sensor CASCADE;
CREATE TABLE sensor
(
    sensor_id           integer GENERATED ALWAYS AS IDENTITY,
    sensor_code         varchar UNIQUE,
    part_number         varchar, --UNIQUE,
    rev                 varchar,
    Title               varchar NOT NULL,
    char                varchar,
    type                varchar,
    wizard_part         varchar, 
    PRIMARY KEY (sensor_id, sensor_code) --, part_number)
);
-- ERROR:  duplicate key value violates unique constraint "sensor_part_number_key"
-- DETAIL:  Key (part_number)=(MFM7-EHS1-F5CP2) already exists.
-- EHS1F5MFM7CP2	MFM7-EHS1-F5CP2	ADE	Sensitive Either Pole Hall Switch, 38 G, supply filter, npn 5k pull up resistor, Plastic .7" flange mount 1.5" long housing, 3 pin Packard 280 with 6" 20AWG TXL	EHS1	HS	yes
-- EHS1BZ2MFM7ACP2A	MFM7-EHS1-F5CP2	xAA	Micro Power Either Pole Hall Switch, 38 G, Battery Operated, 10V zener output clamp, Plastic .7" flange mount no O ring 1" long housing, 3 pin Packard 280 with 6" 20AWG TXL and corrugated tube	EHS1	HS	yes


-- ERROR:  duplicate key value violates unique constraint "sensor_sensor_code_key"
-- DETAIL:  Key (sensor_code)=(EHS1B3OS63BP21) already exists. --> changed to 3T (as it should be)
--changed these as well m12 -> s12
-- HL1POS12CD3	S12-HL1-POCD3	ACD	Hall Latch with 35 gauss operate point, pnp open collector output, Plastic 12x1mm x 35mm housing, 3 pin Deutsch DT with 5 inch 20 AWG XLPE	HL1	HL	yes
-- HL1POS12CP2	S12-HL1-POCP2	ACE	Hall Latch with 35 gauss operate point, pnp open collector output, Plastic 12x1mm x 35mm housing, 3 pin Packard 280 with 6" 20AWG TXL	HL1	HL	yes
-----------------CANT INDEX SENSOR_CODE OR PARTNUMBER ----> RUNNING INTO REPEATED VALUES
DROP INDEX if EXISTS sensor_key;
CREATE INDEX sensor_key ON sensor (sensor_code);
copy sensor (sensor_code, part_number, rev, Title, char, type, wizard_part) from 'D:\DATA\Sensor\webApp\sensors(web&nonWiz).csv'  delimiter ',' csv header;




