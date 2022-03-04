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
