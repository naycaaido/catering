import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Prisma } from 'src/generated/prisma/client';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(AuthGuard)
  @Get()
  getAll() {
    const result = this.authService.getAll();
    return result;
  }

  @Post('register')
  createUser(@Body() createUser: Prisma.UserCreateInput) {
    return this.authService.create(createUser);
  }

  @Post('login')
  signIn(@Body() signData: { email: string; password: string }) {
    return this.authService.signIn(signData.email, signData.password);
  }
}
