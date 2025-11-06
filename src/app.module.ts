import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { FaultModule } from './fault/fault.module';
import { DailyStatusModule } from './daily-status/daily-status.module';
import { SimulatorsModule } from './simulator/simulator.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [PrismaModule, FaultModule, DailyStatusModule, FaultModule, SimulatorsModule, UserModule],
})
export class AppModule {}
