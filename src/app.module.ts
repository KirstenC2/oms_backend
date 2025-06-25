import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { DepartmentsModule } from './departments/departments.module';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [UsersModule, PrismaModule, DepartmentsModule, RolesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
