import { Module } from '@nestjs/common';
import { MealPlansService } from './meal-plans.service';
import { MealPlansController } from './meal-plans.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [MealPlansController],
  providers: [MealPlansService],
  imports: [DatabaseModule],
})
export class MealPlansModule {}
