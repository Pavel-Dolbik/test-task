export const INIT_TABLES_AND_CONSTRAINTS = `
	CREATE TABLE IF NOT EXISTS Cars (
		car_number TEXT NOT NULL PRIMARY KEY
	);

	CREATE TABLE IF NOT EXISTS Rent_Sessions(
		id TEXT NOT NULL PRIMARY KEY,
		start_date DATE,
		end_date DATE,
		car_number TEXT REFERENCES Cars(car_number),
		CHECK (
			DATE_PART('day', end_date::timestamp - start_date::timestamp) >= 1 AND 
			DATE_PART('day', end_date::timestamp - start_date::timestamp) <= 30
		) 
	);

	CREATE TABLE IF NOT EXISTS Rates(
		id SERIAL NOT NULL PRIMARY KEY,
		percent SMALLINT
	);
`;

export const INIT_PROCEDURES_FUNCTIONS_AND_VIEWS = `
	DROP FUNCTION IF EXISTS insert_car;

	CREATE OR REPLACE FUNCTION insert_car(car_num TEXT)
	RETURNS TABLE (car_number TEXT)
	AS $$
		DECLARE count_of_cars INTEGER;
		BEGIN
			SELECT count(*) INTO count_of_cars FROM Cars;
			IF count_of_cars < 5 THEN
				INSERT INTO Cars VALUES (car_num);
				RETURN QUERY SELECT * FROM Cars ORDER BY Cars DESC LIMIT 1;
			ELSE
				RAISE EXCEPTION 'The car park is full.';
			END IF;
		END;
	$$ 
	LANGUAGE plpgsql;
`;

export const INSERT_INITIAL_DATA = `
	DELETE FROM Cars;

	SELECT * FROM insert_car('9832 ГС-1');
	SELECT * FROM insert_car('9212 МН-3');
	SELECT * FROM insert_car('3244 ГС-3');
	SELECT * FROM insert_car('4224 МО-2');
	SELECT * FROM insert_car('3232 МГ-5');

	DELETE FROM Rates;

	INSERT INTO Rates(percent) VALUES (0);
	INSERT INTO Rates(percent) VALUES (5);
	INSERT INTO Rates(percent) VALUES (10);
	INSERT INTO Rates(percent) VALUES (15);
`;
