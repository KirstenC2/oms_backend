import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaService) {}

  create(name: string) {
    return this.prisma.role.create({ data: { name } });
  }

  findAll() {
    return this.prisma.role.findMany();
  }

  findOne(id: string) {
    return this.prisma.role.findUnique({ where: { id } });
  }
}
