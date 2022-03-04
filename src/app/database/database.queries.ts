export const INIT_TABLES_AND_CONSTRAINTS = `
	CREATE TABLE IF NOT EXISTS Cars (
		"carNumber" TEXT NOT NULL PRIMARY KEY
	);

	CREATE TABLE IF NOT EXISTS Rent_Sessions(
		id TEXT NOT NULL PRIMARY KEY,
		"startDate" DATE,
		"endDate" DATE,
		"carNumber" TEXT REFERENCES Cars("carNumber"),
		CHECK (
			"endDate" > "startDate" AND
		 	"endDate" - "startDate" >= 1 AND 
			"endDate" - "startDate" <= 30
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
	RETURNS TABLE ("carNumber" TEXT)
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

	DROP FUNCTION IF EXISTS insert_session;

	CREATE OR REPLACE FUNCTION insert_session(_id TEXT,_start_date Date, _end_date Date, _car_number TEXT)
	RETURNS TABLE (id TEXT, "startDate" Date, "endDate" Date, "carNumber" TEXT)
	AS $$
		DECLARE lastDate DATE;
		SHOW lastDate;
		BEGIN
			SELECT Rent_Sessions."endDate" INTO lastDate 
				FROM Rent_Sessions 
				WHERE Rent_Sessions."carNumber" = _car_number 
				ORDER BY Rent_Sessions."endDate" DESC LIMIT 1;
			IF _start_date - lastDate >= 3 OR lastDate IS NULL THEN
				INSERT INTO Rent_Sessions VALUES (_id, _start_date, _end_date, _car_number);
				RETURN QUERY SELECT * FROM Rent_Sessions WHERE Rent_Sessions.id LIKE _id;
			ELSE
				RAISE EXCEPTION 'Error cannot create rent_session'
					USING HINT = 'You have already booked parking ' || _start_date - lastDate || ' days ago';
			END IF;
		END; 
	$$
	LANGUAGE plpgsql;
`;

export const INSERT_INITIAL_DATA = `
	SELECT * FROM insert_car('9832 ГС-1');
	SELECT * FROM insert_car('9212 МН-3');
	SELECT * FROM insert_car('3244 ГС-3');
	SELECT * FROM insert_car('4224 МО-2');
	SELECT * FROM insert_car('3232 МГ-5');

	INSERT INTO Rates(percent) VALUES (5);
	INSERT INTO Rates(percent) VALUES (10);
	INSERT INTO Rates(percent) VALUES (15);
`;
