import { Module } from '@nestjs/common';
import { FaultService } from './fault.service';
import { FaultController } from './fault.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [FaultController],
  providers: [FaultService],
  exports: [FaultService],
})
export class FaultModule {}
