import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import bcrypt from 'bcrypt';
import { User, Prisma } from '../generated/prisma/client';

@Injectable()
export class AuthService {
  constructor(private prisma: DatabaseService) {}
  async getAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }
  async create(createUser: Prisma.UserCreateInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUser.password, 10);
    return this.prisma.user.create({
      data: {
        ...createUser,
        password: hashedPassword,
      },
    });
  }
}
