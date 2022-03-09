import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReportService } from './report.service';

@Controller('report')
@ApiTags('Report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get()
  async showReport() {
    return await this.reportService.selectAll();
  }

  @Get(':carNumber')
  async showReportByCarNumber(@Param('carNumber') carNumber: string) {
    return await this.reportService.selectByCar(carNumber);
  }
}
