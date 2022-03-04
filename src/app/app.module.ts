import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { CarsModule } from './database/entities/cars/cars.module';
import { RentSessionsModule } from './database/entities/rent-sessions/rent-sessions.module';
import { AllExceptionsFilter } from './exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    CarsModule,
    RentSessionsModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
