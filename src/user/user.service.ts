import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService  {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    try {
      return await this.prisma.user.findMany();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });
      if (!user) throw new NotFoundException(`User ${id} not found`);
      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async create(dto: CreateUserDto) {
    try {
      return await this.prisma.user.create({ data: dto });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: number, dto: UpdateUserDto) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });
      if (!user) throw new NotFoundException(`User ${id} not found`);
      return await this.prisma.user.update({ where: { id }, data: dto });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: number) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });
      if (!user) throw new NotFoundException(`User ${id} not found`);
      return await this.prisma.user.delete({ where: { id } });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
