import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { MealPlan, Prisma } from '../generated/prisma/client';

@Injectable()
export class MealPlansService {
  constructor(private prisma: DatabaseService) {}

  async create(createMeal: Prisma.MealPlanCreateInput) {
    return await this.prisma.mealPlan.create({ data: createMeal });
  }

  async findAll(): Promise<MealPlan[]> {
    return await this.prisma.mealPlan.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.mealPlan.findUnique({ where: { id } });
  }

  async update(id: string, updateMeal: Prisma.MealPlanUpdateInput) {
    return await this.prisma.mealPlan.update({
      where: { id },
      data: updateMeal,
    });
  }

  async remove(id: string) {
    return await this.prisma.mealPlan.delete({ where: { id } });
  }
}
