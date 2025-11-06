import { Module } from '@nestjs/common';
import { SimulatorsService } from '../simulator/simulator.service';
import { SimulatorsController } from '../simulator/simulator.controller';
import { ActivitiesService } from './activity/activity.service';
import { ActivitiesController } from './activity/activity.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { ActivityModule } from './activity/activity.module';

@Module({
  imports: [PrismaModule, ActivityModule],
  controllers: [SimulatorsController,ActivitiesController ],
  providers: [SimulatorsService,ActivitiesService ],
})
export class SimulatorsModule {}
