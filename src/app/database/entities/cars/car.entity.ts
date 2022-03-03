import { ApiProperty } from '@nestjs/swagger';

export class Car {
  @ApiProperty({ type: String })
  carNumber: string;
}
