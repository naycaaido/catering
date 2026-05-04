import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Prisma } from 'src/generated/prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Get()
  getAll() {
    const result = this.authService.getAll();
    return result;
  }
  @Post()
  createUser(@Body() createUser: Prisma.UserCreateInput) {
    return this.authService.create(createUser);
  }
}
