import { Module } from '@nestjs/common';
import { LeaveRequestService } from './leave-request.service';
import { LeaveRequestController } from './leave-request.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [LeaveRequestController],
  providers: [LeaveRequestService, PrismaService],
})
export class LeaveRequestModule {}
