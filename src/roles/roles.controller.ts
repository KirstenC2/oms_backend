import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('roles')
export class RolesController {
  constructor(private readonly prisma: PrismaService) {}

  @Post()
  async create(@Body() body: { name: string }) {
    return this.prisma.role.create({ data: { name: body.name } });
  }

  @Get()
  async findAll() {
    return this.prisma.role.findMany();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.prisma.role.findUnique({ where: { id } });
  }
}
