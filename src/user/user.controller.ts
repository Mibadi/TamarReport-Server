import { Controller, Get, Param, InternalServerErrorException } from '@nestjs/common';
import { FaultService } from '../fault/fault.service';

@Controller('user')
export class UserController {
  constructor(private readonly faultService: FaultService) {}

  // GET /user/:userId/faults → כל התקלות של משתמש מסוים
  @Get(':userId/faults')
  async findByUser(@Param('userId') userId: string) {
    try {
      const allFaults = await this.faultService.findAll();
      // הסינון לפי reportedBy.id
      return allFaults.filter(fault => fault.reportedBy.id === +userId);
    } catch (error) {
      throw new InternalServerErrorException(`שגיאה בקבלת התקלות של המשתמש: ${error.message}`);
    }
  }
}
