import { Controller, Get, Query, HttpException, HttpStatus } from '@nestjs/common';
import { ActivitiesService } from './activity.service';

@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

    // GET /activities/?id=companyId → all activities for a company
  @Get()
  async findAllByCompany(@Query('id') companyId: number) {
    try {
      return await this.activitiesService.findAllByCompany(+companyId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
