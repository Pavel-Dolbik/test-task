import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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

  @Get(':id')
  async selectById(@Param('id') id: string) {
    return await this.rentSessionsService.selectById(id);
  }

  @Get()
  async selectAll() {
    return await this.rentSessionsService.selectAll();
  }
}
