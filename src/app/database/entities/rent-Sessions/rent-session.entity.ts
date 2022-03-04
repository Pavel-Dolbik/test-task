import { ApiProperty } from '@nestjs/swagger';

export class RentSession {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  carNumber: string;

  @ApiProperty({ type: String })
  startDate: Date;

  @ApiProperty({ type: String })
  endDate: Date;
}
