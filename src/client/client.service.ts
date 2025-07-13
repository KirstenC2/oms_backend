import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClientDto } from './dto/create-client.dto';

@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateClientDto) {
    return this.prisma.client.create({
      data: {
        name: dto.name,
        email: dto.email,
        phone: dto.phone,
        company: dto.company,
        notes: dto.notes,
      },
    });
  }

  async findAll() {
    return this.prisma.client.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.client.findUnique({
      where: { id },
    });
  }

  async delete(id: string) {
    return this.prisma.client.delete({
      where: { id },
    });
  }
}
