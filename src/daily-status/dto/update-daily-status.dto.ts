import { PartialType } from '@nestjs/mapped-types';
import { CreateDailyStatusDto } from './create-daily-status.dto';

export class UpdateDailyStatusDto extends PartialType(CreateDailyStatusDto) {}

