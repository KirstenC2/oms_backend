import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { DepartmentsModule } from './departments/departments.module';
import { RolesModule } from './roles/roles.module';
import { DepartmentsService } from './departments/departments.service';
import { LeaveRequestModule } from './leave-request/leave-request.module';

@Module({
  imports: [UsersModule, PrismaModule, DepartmentsModule, RolesModule, LeaveRequestModule],
  controllers: [AppController],
  providers: [AppService, DepartmentsService],
})
export class AppModule {}
