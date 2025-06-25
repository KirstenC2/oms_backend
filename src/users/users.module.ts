import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports:[PrismaModule],             
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
