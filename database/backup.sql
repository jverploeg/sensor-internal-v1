-- switch to sensor database
\c sensors;

----------HOUSING-----------------
copy housing (housing_code, part_number, rev, Title, web_valid, png_file, mech_file) TO 'D:\DATA\Sensor\webApp\csv_files\backup\housing.csv'  delimiter ',' csv header;
----------------------------------


----------CHAR--------------------
copy char (char_code, Title, Type, Type_Description, Web_Valid, Bullet_file) TO 'D:\DATA\Sensor\webApp\csv_files\backup\char.csv'  delimiter ',' csv header;
----------------------------------


----------OPTION------------------
copy option (option_code, Title, web_valid, png_file) TO 'D:\DATA\Sensor\webApp\csv_files\backup\option.csv'  delimiter ',' csv header;
----------------------------------


----------CHAR OPTION-------------
copy char_op (char_op_code, option_code, rev, Title, web_valid, png_file) TO 'D:\DATA\Sensor\webApp\csv_files\backup\char_op.csv'  delimiter ',' csv header;
----------------------------------


----------CONNECTION--------------
copy connection (connection_code, web_code, rev, Title, web_valid, part_number, png_file) TO 'D:\DATA\Sensor\webApp\csv_files\backup\connection.csv'  delimiter ',' csv header;
----------------------------------


----------SENSOR------------------
copy sensor (sensor_code, part_number, rev, Title, char, type, wizard_part) TO 'D:\DATA\Sensor\webApp\csv_files\backup\catalog.csv'  delimiter ',' csv header;
----------------------------------


----------CUSTOM------------------
copy custom (custom_sensor_code, part_number, rev, Title, type, housing, char, option, connection, conn_chart, spec_chart, picture) TO 'D:\DATA\Sensor\webApp\csv_files\backup\custom.csv'  delimiter ',' csv header;
----------------------------------


----------XPROTO------------------
--copy xproto TO 'D:\DATA\Sensor\webApp\csv_files\backup\xproto.csv'  delimiter ',' csv header;
----------------------------------