// create-client-quotation.dto.ts
import {
  IsString,
  IsOptional,
  IsDateString,
  IsNumber,
  IsArray,
  ValidateNested,
  IsBoolean,
  IsInt,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateClientQuotationItemDto } from './create-client-quotation-item.dto';

export class CreateClientQuotationDto {
  @IsString()
  referenceCode: string;

  @IsString()
  clientId: string;

  @IsString()
  projectId: string;

  @IsInt()
  version: number;

  @IsOptional()
  @IsDateString()
  validUntil?: string;

  @IsNumber()
  totalAmount: number;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsBoolean()
  confirmed?: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateClientQuotationItemDto)
  items: CreateClientQuotationItemDto[];
}
