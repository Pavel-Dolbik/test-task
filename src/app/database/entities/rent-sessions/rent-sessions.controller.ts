import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateRentSessionDto } from './rent-sessions.dto';
import { RentSessionsService } from './rent-sessions.service';

@Controller('rent-sessions')
@ApiTags('RentSessions')
export class RentSessionsController {
  constructor(private rentSessionsService: RentSessionsService) {}

  @Post()
  @ApiBody({ type: CreateRentSessionDto })
  async insert(@Body() newRentSession: CreateRentSessionDto) {
    return await this.rentSessionsService.insert(newRentSession);
  }
}
