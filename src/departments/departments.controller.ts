import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('departments')
export class DepartmentsController {
  constructor(private readonly prisma: PrismaService) {}

  @Post()
  async create(@Body() body: { name: string }) {
    return this.prisma.department.create({ data: { name: body.name } });
  }

  @Get()
  async findAll() {
    return this.prisma.department.findMany();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.prisma.department.findUnique({ where: { id } });
  }
}
