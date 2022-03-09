import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database.module';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';

@Module({
  imports: [DatabaseModule],
  providers: [ReportService],
  controllers: [ReportController],
})
export class ReportModule {}
