import { Module } from '@nestjs/common';
import { ClientQuotationController } from './quotations.controller';
import { QuotationService } from './quotations.service';
import { Prisma } from '@prisma/client';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ClientQuotationController],
  providers: [QuotationService]
})
export class QuotationsModule {}
