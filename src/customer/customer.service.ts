import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from 'src/generated/prisma/client';

@Injectable()
export class CustomerService {
  constructor(private prisma: DatabaseService) {}
  async create(createCustomer: Prisma.CustomerProfileCreateInput) {
    return await this.prisma.customerProfile.create({ data: createCustomer });
  }

  async findOne(id: string) {
    return await this.prisma.customerProfile.findUnique({ where: { id } });
  }
}
