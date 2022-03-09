import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database.service';
import { SELECT_RATES } from './rates.queries';

@Injectable()
export class RatesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async selectAll() {
    return await this.getClient().query(SELECT_RATES());
  }

  private getClient() {
    return this.databaseService.getClient();
  }
}
