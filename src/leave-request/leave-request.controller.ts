import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Req,
} from '@nestjs/common';
import { LeaveRequestService } from './leave-request.service';
import { request } from 'http';

@Controller('leave-requests')
export class LeaveRequestController {
  constructor(private readonly service: LeaveRequestService) {}

  @Post()
  create(@Body() body: any) {
    return this.service.create(body);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('me/:userId')
  findMine(@Param('userId') userId: string) {
    return this.service.findByUser(userId);
  }

  @Get(':requestId/details')
  findOne(@Param('requestId') requestId: string) {
    return this.service.findByRequestId(requestId);
  }

  @Patch(':id/approve')
  approve(@Param('id') id: string, @Body('reviewerId') reviewerId: string) {
    return this.service.approve(id, reviewerId);
  }

  @Patch(':id/reject')
  reject(@Param('id') id: string, @Body('reviewerId') reviewerId: string) {
    return this.service.reject(id, reviewerId);
  }

  @Patch(':id/cancel')
  cancel(@Param('id') id: string) {
    return this.service.cancel(id);
  }
}
