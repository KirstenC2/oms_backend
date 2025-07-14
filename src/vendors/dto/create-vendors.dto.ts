// src/vendors/dto/create-vendor.dto.ts
import { IsString, IsOptional, IsEmail, IsPhoneNumber } from 'class-validator';

export class CreateVendorsDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  contactName?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @IsString()
  @IsOptional()
  company?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}