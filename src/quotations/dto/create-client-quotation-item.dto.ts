// create-client-quotation-item.dto.ts
import { IsString, IsOptional, IsInt, IsNumber, Min } from 'class-validator';

export class CreateClientQuotationItemDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt()
  @Min(1)
  quantity: number;

  @IsNumber()
  unitPrice: number;

  @IsOptional()
  @IsNumber()
  discount?: number; // 預設可由後端設 0

  @IsNumber()
  total: number; // 前端可先算好，後端也會檢查一次
}
