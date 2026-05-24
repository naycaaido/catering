import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Prisma } from 'src/generated/prisma/client';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('register')
  createUser(@Body() createUser: Prisma.UserCreateInput) {
    return this.authService.create(createUser);
  }

  @Public()
  @Post('login')
  signIn(@Body() signData: { email: string; password: string }) {
    return this.authService.signIn(signData.email, signData.password);
  }
}
