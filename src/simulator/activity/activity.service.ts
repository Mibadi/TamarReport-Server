import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

@Injectable()
export class ActivitiesService {
  constructor(private prisma: PrismaService) {}

  async findAllByCompany(companyId: number) {
    try {
      return await this.prisma.activity.findMany({
        where: { simulator: { company_id: companyId } },
        include: { simulator: true, user: true },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async create(dto: CreateActivityDto) {
    try {
 return await this.prisma.activity.create({
    data: {
      description: dto.description,
      type: dto.type,
      timestamp: dto.timestamp,
      duration_minutes: dto.durationMinutes,
      simulator: { connect: { id: dto.simulatorId } },
      user: { connect: { id: dto.userId } },
    },
  });    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: number, dto: UpdateActivityDto) {
    try {
      return await this.prisma.activity.update({ where: { id }, data: dto });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.activity.delete({ where: { id } });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
