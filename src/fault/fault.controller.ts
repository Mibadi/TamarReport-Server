import { Controller, Get, Post, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { FaultService } from './fault.service';
import { CreateFaultDto } from './dto/create-fault.dto';

@Controller('faults')
export class FaultController {
  constructor(private readonly faultService: FaultService) {}

  // GET /faults → all faults for overseer
  @Get()
  async findAll() {
    try {
      return await this.faultService.findAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // GET /faults/{userid} → faults reported by specific user
  @Get(':userId')
  async findByUser(@Param('userId') userId: number) {
    try {
      return await this.faultService.findByUser(+userId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  
  // POST /faults → create new fault
  @Post()
  async create(@Body() createFaultDto: CreateFaultDto) {
    try {
      return await this.faultService.create(createFaultDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
