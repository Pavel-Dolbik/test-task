import { CreateRentSessionDto } from './rent-sessions.dto';
import { v4 as uuid4 } from 'uuid';

export const INSERT_RENT_SESSION = (rentSession: CreateRentSessionDto) =>
  "SELECT * FROM insert_session('" +
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

export const SELECT_ALL_RENT_SESSIONS = () => 'SELECT * FROM Rent_Sessions;';
