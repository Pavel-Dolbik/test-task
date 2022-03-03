import { Inject, Injectable } from '@nestjs/common';
import { Client } from 'pg';

@Injectable()
export class CarService {
  constructor(@Inject('POSTGRES_CLIENT') private client: Client) {}
}
