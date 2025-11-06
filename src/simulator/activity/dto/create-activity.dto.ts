import {  ActivityType } from  '@prisma/client';

export class CreateActivityDto {
  simulatorId: number;
  userId: number;
  description: string;
  type: ActivityType;
  timestamp: Date;
  durationMinutes?: number;
}
