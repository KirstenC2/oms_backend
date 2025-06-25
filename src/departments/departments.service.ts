import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DepartmentsService {
  constructor(private readonly prisma: PrismaService) {}

  create(name: string) {
    return this.prisma.department.create({ data: { name } });
  }

  findAll() {
    return this.prisma.department.findMany();
  }

  findOne(id: string) {
    return this.prisma.department.findUnique({ where: { id } });
  }
}
