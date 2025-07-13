import {
  Post,
  Body,
  Get,
  Param,
  Query,
  ParseUUIDPipe,
  Controller,
} from '@nestjs/common';
import { QuotationService } from './quotations.service';
import { CreateClientQuotationDto } from './dto/create-client-quotation.dto';

@Controller('client-quotations')
export class ClientQuotationController {
  constructor(private readonly quotationService: QuotationService) {}

  // 建立新的客戶報價單
  @Post()
  async create(@Body() createDto: CreateClientQuotationDto) {
    return this.quotationService.createClientQuotation(createDto);
  }

  // 查詢所有客戶報價單（可以用 query 篩選）
  @Get()
  async findAll(
    @Query('projectId', ParseUUIDPipe) projectId?: string,
    @Query('clientId') clientId?: string,
  ) {
    return this.quotationService.findClientQuotations({ projectId, clientId });
  }

  // 查詢單筆報價單
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.quotationService.findClientQuotationById(id);
  }
}

@Controller('vendor-quotations')
export class VendorQuotationController {
  constructor(private readonly quotationService: QuotationService) {}

  // 建立新的廠商報價單')

    @Post()
    async create(@Body() createDto: CreateClientQuotationDto) {
      return this.quotationService.createClientQuotation(createDto);
    }   
}