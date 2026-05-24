import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { MealPlansService } from './meal-plans.service';
import { Prisma } from 'src/generated/prisma/client';
import { Public } from 'src/auth/public.decorator';
import type { RequestWithUser } from 'src/auth/interface/request-with-user.interface';

@Controller('meal-plans')
export class MealPlansController {
  constructor(private readonly mealPlansService: MealPlansService) {}

  @Post()
  create(
    @Body() createMeal: Prisma.MealPlanCreateInput,
    @Req() req: RequestWithUser,
  ) {
    if (req.user.role === 'USER') {
      throw new UnauthorizedException();
    }
    return this.mealPlansService.create(createMeal);
  }

  @Public()
  @Get()
  findAll() {
    return this.mealPlansService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mealPlansService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMeal: Prisma.MealPlanUpdateInput,
    @Req() req: RequestWithUser,
  ) {
    if (req.user.role === 'USER') {
      throw new UnauthorizedException();
    }
    return this.mealPlansService.update(id, updateMeal);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: RequestWithUser) {
    if (req.user.role === 'USER') {
      throw new UnauthorizedException();
    }
    return this.mealPlansService.remove(id);
  }
}
