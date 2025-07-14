// src/vendors/dto/base-vendor.dto.ts
export class BaseVendorsDto {
  id: string;
  name: string;
  contactName?: string;
  email?: string;
  phone?: string;
  company?: string;
  address?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}