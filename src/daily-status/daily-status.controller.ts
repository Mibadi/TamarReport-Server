import { Controller, Get, Post, Query, Body, HttpException, HttpStatus } from '@nestjs/common';
import { DailyStatusService } from './daily-status.service';
import { CreateDailyStatusDto } from './dto/create-daily-status.dto';

@Controller('status')
export class DailyStatusController {
  constructor(private readonly dailyStatusService: DailyStatusService) {}

  // GET /status?date=dd/mm/yyyy → statuses from given date
  @Get()
  async findByDate(@Query('date') date: string) {
    try {
      return await this.dailyStatusService.findByDate(date);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  
  // POST /status → create new daily report
  @Post()
  async create(@Body() createDto: CreateDailyStatusDto) {
    try {
      return await this.dailyStatusService.create(createDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
