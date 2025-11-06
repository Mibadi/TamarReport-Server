import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from 'prisma/prisma.module';
import { FaultModule } from 'src/fault/fault.module';

@Module({
  imports: [PrismaModule, FaultModule],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
