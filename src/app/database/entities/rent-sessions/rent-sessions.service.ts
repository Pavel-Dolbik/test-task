import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database.service';
import { CreateRentSessionDto } from './rent-sessions.dto';
import { INSERT_RENT_SESSION } from './rent-sessions.queries';

@Injectable()
export class RentSessionsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async insert(newRentSession: CreateRentSessionDto) {
    return await this.databaseService
      .getClient()
      .query(INSERT_RENT_SESSION(newRentSession));
  }
}
