import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userServices: UsersService) {}

  @Get()
  getAll() {
    const result = this.userServices.getAll();
    return result;
  }

  @Get(':id')
  findOne(@Param() id: any) {
    console.log(id);
    return `This is user with id: ${id}`;
  }
}
