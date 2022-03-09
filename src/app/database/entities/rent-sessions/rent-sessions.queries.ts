import { CreateRentSessionDto } from './rent-sessions.dto';
import { v4 as uuid4 } from 'uuid';

export const INSERT_RENT_SESSION = (rentSession: CreateRentSessionDto) =>
  "INSERT INTO Rent_Sessions VALUES ('" +
  uuid4() +
  "', '" +
  rentSession.startDate +
  "', '" +
  rentSession.endDate +
  "', '" +
  rentSession.carNumber +
  "')";

export const SELECT_RENT_SESSION_BY_ID = (id: string) =>
  `SELECT * FROM Rent_Sessions WHERE id = '${id}';`;

export const SELECT_ALL_RENT_SESSIONS = 'SELECT * FROM Rent_Sessions;';

export const SELECT_SESSION_BY_CAR_NUMBER = (carNumber: string) => `
  SELECT * FROM Rent_sessions WHERE "carNumber" = '${carNumber}';
`;

export const SELECT_LAST_SESSION = (carNumber: string) => `
  SELECT "endDate" 
    FROM Rent_Sessions 
	  WHERE "carNumber" = '${carNumber}'
	  ORDER BY "endDate" DESC LIMIT 1;
`;

export const SELECT_BOOKED_SESSION = (carNumber: string, endDate: string) => `
  SELECT "startDate" FROM Rent_Sessions
  WHERE "carNumber" = '${carNumber}' AND "endDate" >= '${endDate}'\
  ORDER BY "startDate" ASC LIMIT 1;
`;
