import { IsString, IsInt, IsEnum } from 'class-validator';
import { SimulatorStatus } from  '@prisma/client';

export class CreateSimulatorDto {
  @IsString()
  name: string;

  @IsString()
  model: string;

  @IsString()
  serialNumber: string;

  @IsInt()
  companyId: number;

  @IsInt()
  siteId: number;

  @IsEnum(SimulatorStatus)
  status: SimulatorStatus;
}
