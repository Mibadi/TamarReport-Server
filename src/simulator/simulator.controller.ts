import { Controller, Get, Param, HttpException, HttpStatus } from '@nestjs/common';
import { SimulatorsService } from './simulator.service';

@Controller('simulators')
export class SimulatorsController {
  constructor(private readonly simulatorsService: SimulatorsService) {}

  // GET /simulators → list all simulators
  @Get()
  async findAll() {
    try {
      return await this.simulatorsService.findAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

    // GET /simulators/{simulatorId} → daily/monthly availability
  @Get(':simulatorId')
  async findOne(@Param('simulatorId') simulatorId: number) {
    try {
      return await this.simulatorsService.findOne(+simulatorId);
    } catch (error) {
      throw new HttpException('Simulator not found', HttpStatus.NOT_FOUND);
    }
  }
}
