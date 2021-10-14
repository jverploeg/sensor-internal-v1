-- switch to sensor database
\c sensors;

----------HOUSING-----------------
copy housing TO 'D:\DATA\Sensor\webApp\csv_files\backup\housing.csv'  delimiter ',' csv header;
----------------------------------


----------CHAR--------------------
copy char TO 'D:\DATA\Sensor\webApp\csv_files\backup\char.csv'  delimiter ',' csv header;
----------------------------------


----------OPTION------------------
copy option TO 'D:\DATA\Sensor\webApp\csv_files\backup\option.csv'  delimiter ',' csv header;
----------------------------------


----------CHAR OPTION-------------
copy char_op TO 'D:\DATA\Sensor\webApp\csv_files\backup\char_op.csv'  delimiter ',' csv header;
----------------------------------


----------CONNECTION--------------
copy connection TO 'D:\DATA\Sensor\webApp\csv_files\backup\connection.csv'  delimiter ',' csv header;
----------------------------------


----------SENSOR------------------
copy sensor TO 'D:\DATA\Sensor\webApp\csv_files\backup\catalog.csv'  delimiter ',' csv header;
----------------------------------


----------CUSTOM------------------
copy custom TO 'D:\DATA\Sensor\webApp\csv_files\backup\custom.csv'  delimiter ',' csv header;
----------------------------------


----------XPROTO------------------
copy xproto TO 'D:\DATA\Sensor\webApp\csv_files\backup\xproto.csv'  delimiter ',' csv header;
----------------------------------