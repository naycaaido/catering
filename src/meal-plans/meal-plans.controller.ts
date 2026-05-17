import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MealPlansService } from './meal-plans.service';
import { Prisma } from 'src/generated/prisma/client';

@Controller('meal-plans')
export class MealPlansController {
  constructor(private readonly mealPlansService: MealPlansService) {}

  @Post()
  create(@Body() createMeal: Prisma.MealPlanCreateInput) {
    return this.mealPlansService.create(createMeal);
  }

  @Get()
  findAll() {
    return this.mealPlansService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mealPlansService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMeal: Prisma.MealPlanUpdateInput,
  ) {
    return this.mealPlansService.update(id, updateMeal);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mealPlansService.remove(id);
  }
}
