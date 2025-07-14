import { Body, Controller, Get, Post } from '@nestjs/common';
import { VendorsService } from './vendors.service';
import { CreateVendorsDto } from './dto/create-vendors.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';


@Controller('vendors')
export class VendorsController {

    constructor(private readonly vendorsService: VendorsService) {}

    @Post()
    async createVendor( @Body() body: any) {
        const createVendorDto = plainToInstance(CreateVendorsDto, body);
        return this.vendorsService.create({
            name: createVendorDto.name,
            contactName: createVendorDto.contactName,
            email: createVendorDto.email,
            phone: createVendorDto.phone, 
            company: createVendorDto.company,
            address: createVendorDto.address,
            notes: createVendorDto.notes,
        });
    }   

    @Get()
    async findAll() {
        return this.vendorsService.findAll();
    }
}
