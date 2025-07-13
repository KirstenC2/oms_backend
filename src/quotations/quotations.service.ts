import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClientQuotationDto } from './dto/create-client-quotation.dto';
@Injectable()
export class QuotationService {
  constructor(private prisma: PrismaService) {}

  async createClientQuotation(dto: CreateClientQuotationDto) {
    return this.prisma.clientQuotation.create({
      data: {
        ...dto,
        items: { create: dto.items },
      },
      include: { items: true },
    });
  }

  async findClientQuotations(filters: {
    projectId?: string;
    clientId?: string;
  }) {
    return this.prisma.clientQuotation.findMany({
      where: {
        projectId: filters.projectId,
        clientId: filters.clientId,
      },
      include: { items: true },
    });
  }

  async findClientQuotationById(id: string) {
    return this.prisma.clientQuotation.findUnique({
      where: { id },
      include: { items: true },
    });
  }
}
