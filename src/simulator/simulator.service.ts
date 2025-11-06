import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateSimulatorDto } from './dto/create-simulator.dto';
import { UpdateSimulatorDto } from './dto/update-simulator.dto';
import { ActivitiesService } from './activity/activity.service';

@Injectable()
export class SimulatorsService {
  constructor(private prisma: PrismaService , private readonly activitiesService: ActivitiesService) {}

  async findAll() {
    try {
      return await this.prisma.simulator.findMany({
        include: { company: true, site: true, employees: true },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: number) {
    try {
      const sim = await this.prisma.simulator.findUnique({
        where: { id },
        include: { company: true, site: true, employees: true, dailyStatuses: true },
      });
      if (!sim) throw new NotFoundException(`Simulator ${id} not found`);
      return sim;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async create(dto: CreateSimulatorDto) {
    try {
return await this.prisma.simulator.create({
    data: {
      name: dto.name,
      model: dto.model,
      serial_number: dto.serialNumber,
      company: { connect: { id: dto.companyId } },
      site: { connect: { id: dto.siteId } },
      status: dto.status,
    },
  });    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: number, dto: UpdateSimulatorDto) {
    try {
      const sim = await this.prisma.simulator.findUnique({ where: { id } });
      if (!sim) throw new NotFoundException(`Simulator ${id} not found`);
      return await this.prisma.simulator.update({ where: { id }, data: dto });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: number) {
    try {
      const sim = await this.prisma.simulator.findUnique({ where: { id } });
      if (!sim) throw new NotFoundException(`Simulator ${id} not found`);
      return await this.prisma.simulator.delete({ where: { id } });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
