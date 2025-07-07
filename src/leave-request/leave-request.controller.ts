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

  @Patch(':id/approve')
  approve(@Param('id') id: string, @Body('reviewerId') reviewerId: string) {
    return this.service.approve(id, reviewerId);
  }

  @Patch(':id/reject')
  reject(@Param('id') id: string, @Body('reviewerId') reviewerId: string) {
    return this.service.reject(id, reviewerId);
  }

  @Patch(':id/cancel')
  cancel(@Param('id') id: string, @Body('userId') userId: string) {
    return this.service.cancel(id, userId);
  }
}
