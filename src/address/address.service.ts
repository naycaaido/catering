import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from 'src/generated/prisma/client';

@Injectable()
export class AddressService {
  constructor(private prisma: DatabaseService) {}

  async create(createAddress: Prisma.AddressCreateInput) {
    return await this.prisma.address.create({ data: createAddress });
  }

  async findAll() {
    return await this.prisma.address.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.address.findUnique({ where: { id } });
  }

  async update(id: string, updateAddress: Prisma.AddressUpdateInput) {
    return await this.prisma.address.update({
      where: { id },
      data: updateAddress,
    });
  }

  async remove(id: string) {
    return await this.prisma.address.delete({ where: { id } });
  }
}
