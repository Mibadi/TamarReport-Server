import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateFaultDto } from './dto/create-fault.dto';
import { UpdateFaultDto } from './dto/update-fault.dto';

@Injectable()
export class FaultService {
  constructor(private readonly prisma: PrismaService) {}

  // Get all faults
  async findAll() {
    return await this.prisma.fault.findMany({
      include: { faultType: true, simulator: true, reportedBy: true },
    });
  }

  // Get faults reported by a specific user
  async findByUser(userId: number) {
    try {
      return await this.prisma.fault.findMany({
        where: { reported_by_user_id: userId },
        include: { faultType: true, simulator: true, reportedBy: true },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Get a single fault by ID
  async findOne(id: number) {
    const fault = await this.prisma.fault.findUnique({
      where: { id },
      include: { faultType: true, simulator: true, reportedBy: true },
    });

    if (!fault) {
      throw new NotFoundException(`Fault with ID ${id} not found`);
    }

    return fault;
  }

  // Create a new fault
  async create(data: CreateFaultDto) {
    return await this.prisma.fault.create({
      data,
      include: { faultType: true, simulator: true, reportedBy: true },
    });
  }

  // Update an existing fault
  async update(id: number, data: UpdateFaultDto) {
    try {
      return await this.prisma.fault.update({
        where: { id },
        data,
        include: { faultType: true, simulator: true, reportedBy: true },
      });
    } catch (error) {
      throw new NotFoundException(`Fault with ID ${id} not found`);
    }
  }

  // Delete a fault
  async delete(id: number) {
    try {
      return await this.prisma.fault.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundException(`Fault with ID ${id} not found`);
    }
  }
}
