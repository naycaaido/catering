import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { DatabaseService } from 'src/database/database.service';

@Module({
  controllers: [CustomerController],
  providers: [CustomerService],
  imports: [DatabaseService],
})
export class CustomerModule {}
