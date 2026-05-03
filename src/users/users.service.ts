import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { User, Prisma } from '../generated/prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: DatabaseService) {}
  async getAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }
}
