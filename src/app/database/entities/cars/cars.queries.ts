export const INSERT_CAR = async (carNumber: string) =>
  `SELECT * FROM public.insert_car('${carNumber}')`;
