import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { RolesService } from './roles.service';

@Module({
  imports: [PrismaModule],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
