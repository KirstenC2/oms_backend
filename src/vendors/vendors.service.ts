// src/vendors/vendors.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Assuming you're using Prisma
import { CreateVendorsDto } from './dto/create-vendors.dto'; // Adjust the import path as necessary
import { ConflictException, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class VendorsService {
  constructor(private prisma: PrismaService) {}

  async create(createVendorDto: CreateVendorsDto){
    try {
      // Check if vendor with same name already exists
      const existingVendor = await this.prisma.vendor.findFirst({
        where: {
          name: createVendorDto.name,
        },
      });

      if (existingVendor) {
        throw new ConflictException('Vendor with this name already exists');
      }

      // Create new vendor
      const vendor = await this.prisma.vendor.create({
        data: {
          name: createVendorDto.name,
          contactName: createVendorDto.contactName,
          email: createVendorDto.email,
          phone: createVendorDto.phone,
          company: createVendorDto.company,
          address: createVendorDto.address,
          notes: createVendorDto.notes,
        },
      });

      return vendor;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to create vendor');
    }
  }

  async findAll() {
    return this.prisma.vendor.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

}