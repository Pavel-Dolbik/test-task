export const INIT_TABLES_AND_CONSTRAINTS = `
	CREATE TABLE IF NOT EXISTS public.Car (
		car_number TEXT NOT NULL PRIMARY KEY
	);

	CREATE TABLE IF NOT EXISTS public.Rent(
		id TEXT NOT NULL PRIMARY KEY,
		start_date DATE,
		end_date DATE,
		car_number TEXT REFERENCES public.Car(car_number),
		CHECK (
			DATE_PART('day', end_date::timestamp - start_date::timestamp) >= 1 AND 
			DATE_PART('day', end_date::timestamp - start_date::timestamp) <= 30
		) 
	);

	CREATE TABLE IF NOT EXISTS public.Rate(
		id TEXT NOT NULL PRIMARY KEY,
		percent SMALLINT
	)
`;
