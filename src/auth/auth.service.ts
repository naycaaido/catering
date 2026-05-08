import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import bcrypt from 'bcrypt';
import { User, Prisma } from '../generated/prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: DatabaseService,
    private jwtService: JwtService,
  ) {}
  async getAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async create(createUser: Prisma.UserCreateInput): Promise<User> {
    const emailTaken = await this.prisma.user.findFirst({
      where: { email: createUser.email },
    });

    if (emailTaken) {
      throw new HttpException('Email alreadt Taken', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(createUser.password, 10);
    return this.prisma.user.create({
      data: {
        ...createUser,
        password: hashedPassword,
      },
    });
  }

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.prisma.user.findFirst({ where: { email } });

    if (!user) {
      throw new UnauthorizedException();
    }

    const isMatch = await bcrypt.compare(pass, user?.password);

    console.log(isMatch);

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
