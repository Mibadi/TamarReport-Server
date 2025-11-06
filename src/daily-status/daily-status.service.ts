// src/daily-status/daily-status.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateDailyStatusDto } from './dto/create-daily-status.dto';
import { UpdateDailyStatusDto } from './dto/update-daily-status.dto';

@Injectable()
export class DailyStatusService {
  constructor(private readonly prisma: PrismaService) {}

  // כל הדוחות
  async findAll() {
    return await this.prisma.dailyStatus.findMany({
      include: {
        simulator: true,
        recordedBy: true,
        forWhichActivator: true,
      },
    });
  }

  // דוח לפי ID
  async findOne(id: number) {
    const status = await this.prisma.dailyStatus.findUnique({
      where: { id },
      include: {
        simulator: true,
        recordedBy: true,
        forWhichActivator: true,
      },
    });

    if (!status) {
      throw new NotFoundException(`DailyStatus עם ID ${id} לא נמצא`);
    }

    return status;
  }

  // יצירת דוח חדש
 async create(data: CreateDailyStatusDto) {
  try {
    const parsedDate = new Date(data.date);
    if (isNaN(parsedDate.getTime())) {
      throw new Error('Invalid date format');
    }

    return await this.prisma.dailyStatus.create({
      data: {
        date: parsedDate, // המרה ל-Date
        status: data.status,
        notes: data.notes,
        simulator: { connect: { id: data.simulatorId } },
        recordedBy: { connect: { id: data.recordedByUserId } },
        forWhichActivator: { connect: { id: data.forWhichActivatorId } },
      },
      include: {
        simulator: true,
        recordedBy: true,
        forWhichActivator: true,
      },
    });
  } catch (error) {
    console.error(' Failed to create daily status:', error);
    throw new Error(`Failed to create daily status: ${error.message}`);
  }
}


  // עדכון דוח
  async update(id: number, data: UpdateDailyStatusDto) {
    try {
      return await this.prisma.dailyStatus.update({
        where: { id },
        data: {
          date: data.date,
          status: data.status,
          notes: data.notes,
          ...(data.simulatorId && { simulator: { connect: { id: data.simulatorId } } }),
          ...(data.recordedByUserId && { recordedBy: { connect: { id: data.recordedByUserId } } }),
          ...(data.forWhichActivatorId && { forWhichActivator: { connect: { id: data.forWhichActivatorId } } }),
        },
        include: {
          simulator: true,
          recordedBy: true,
          forWhichActivator: true,
        },
      });
    } catch (error) {
      throw new NotFoundException(`DailyStatus עם ID ${id} לא נמצא`);
    }
  }

  // מחיקת דוח
  async delete(id: number) {
    try {
      return await this.prisma.dailyStatus.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundException(`DailyStatus עם ID ${id} לא נמצא`);
    }
  }

  // חיפוש דוחות לפי תאריך מסוים
  async findByDate(dateString: string) {
    try {
      // dd/mm/yyyy
      const [day, month, year] = dateString.split('/');
      const parsedDate = new Date(`${year}-${month}-${day}T00:00:00Z`);

      if (isNaN(parsedDate.getTime())) {
        throw new Error('Invalid date format, expected dd/mm/yyyy');
      }

      return await this.prisma.dailyStatus.findMany({
        where: {
          date: parsedDate,
        },
        include: {
          simulator: true,
          recordedBy: true,
          forWhichActivator: true,
        },
      });
    } catch (error) {
      console.error(' Error fetching daily statuses:', error);
      throw new Error(`Failed to get daily statuses: ${error.message}`);
    }
  }
}
