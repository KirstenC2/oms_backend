import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { DepartmentsModule } from './departments/departments.module';
import { RolesModule } from './roles/roles.module';
import { DepartmentsService } from './departments/departments.service';
import { LeaveRequestModule } from './leave-request/leave-request.module';
import { ProjectsModule } from './projects/projects.module';
import { ProjectsService } from './projects/projects.service';
import { IssuesModule } from './issues/issues.module';
import { QuotationsModule } from './quotations/quotations.module';
import { QuotationService } from './quotations/quotations.service';
import { ClientModule } from './client/client.module';
import { VendorsModule } from './vendors/vendors.module';

@Module({
  imports: [PrismaModule, UsersModule, PrismaModule, DepartmentsModule, RolesModule, LeaveRequestModule, ProjectsModule, IssuesModule, QuotationsModule, ClientModule, VendorsModule],
  controllers: [AppController],
  providers: [AppService, DepartmentsService, ProjectsService, QuotationService],
})
export class AppModule {}
