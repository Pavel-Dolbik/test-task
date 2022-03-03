export const INIT_TABLES_AND_CONSTRAINTS = `
	CREATE TABLE IF NOT EXISTS public.Car (
		car_number TEXT NOT NULL PRIMARY KEY
	);

	CREATE TABLE IF NOT EXISTS public.Rent(
		id TEXT NOT NULL PRIMARY KEY,
		start_date DATE,
		end_date DATE,
		car_number TEXT REFERENCES public.Car(car_number),
		CHECK DATED
	);
`;
