import { Module } from '@nestjs/common';
import { DepartmentsController } from './departments.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DepartmentsController],
})
export class DepartmentsModule {}
