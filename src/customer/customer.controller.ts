import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Prisma } from 'src/generated/prisma/client';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  create(@Body() createCustomer: Prisma.CustomerProfileCreateInput) {
    return this.customerService.create(createCustomer);
  }

  @Get()
  findOne() {
    return this.customerService.findOne();
  }
}
