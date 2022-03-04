import { ApiProperty } from '@nestjs/swagger';

export class CreateRentSessionDto {
  @ApiProperty({ type: String })
  carNumber: string;

  @ApiProperty({
    type: String,
    default: new Date().toISOString().split('T')[0],
  })
  startDate: string;

  @ApiProperty({
    type: String,
    default: new Date().toISOString().split('T')[0],
  })
  endDate: string;
}
