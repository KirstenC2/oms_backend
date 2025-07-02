import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  async create(@Body() body: { name: string }) {
    return this.rolesService.create(body.name);
  }

  @Get()
  async findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.rolesService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.rolesService.remove(id);
  }
}
