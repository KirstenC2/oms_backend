import { Module } from '@nestjs/common';
import { DepartmentsController } from './departments.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { DepartmentsService } from './departments.service';

@Module({
  imports: [PrismaModule],
  controllers: [DepartmentsController],
  providers: [DepartmentsService],
})
export class DepartmentsModule {}
