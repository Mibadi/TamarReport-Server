import { DailyStatusEnum } from  '@prisma/client';
import { IsString, IsEnum, IsInt, IsOptional } from 'class-validator';

export class CreateDailyStatusDto {
  @IsInt()
  simulatorId: number;

  @IsString()
  date: string; // 🔹 במקום Date → String

  @IsEnum(DailyStatusEnum)
  status: DailyStatusEnum;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsInt()
  recordedByUserId: number;

  @IsInt()
  forWhichActivatorId: number;
}
