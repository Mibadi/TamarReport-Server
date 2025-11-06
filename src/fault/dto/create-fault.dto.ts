import { IsString, IsEnum, IsInt, Min } from 'class-validator';
import { FaultStatus } from  '@prisma/client';

export class CreateFaultDto {
  @IsInt()
  @Min(1)
  simulator_id: number;

  @IsInt()
  @Min(1)
  fault_type_id: number;

  @IsString()
  description: string;

  @IsInt()
  @Min(1)
  reported_by_user_id: number;

  @IsEnum(FaultStatus)
  status: FaultStatus;
}
