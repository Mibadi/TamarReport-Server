import { Module } from '@nestjs/common';
import { DailyStatusController } from './daily-status.controller';
import { DailyStatusService } from './daily-status.service';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DailyStatusController],
  providers: [DailyStatusService]
})
export class DailyStatusModule {}
