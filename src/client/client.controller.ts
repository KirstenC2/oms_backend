import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  ParseUUIDPipe,
  Delete,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';

@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  async create(@Body() dto: CreateClientDto) {
    return this.clientService.create(dto);
  }

  @Get()
  async findAll() {
    return this.clientService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.clientService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.clientService.delete(id);
  }
}
