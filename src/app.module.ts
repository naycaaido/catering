import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { MealPlansModule } from './meal-plans/meal-plans.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { TestimonialModule } from './testimonial/testimonial.module';
import { AddressModule } from './address/address.module';

@Module({
  imports: [DatabaseModule, AuthModule, MealPlansModule, SubscriptionsModule, TestimonialModule, AddressModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
