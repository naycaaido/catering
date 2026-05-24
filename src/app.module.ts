import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { MealPlansModule } from './meal-plans/meal-plans.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { TestimonialModule } from './testimonial/testimonial.module';
import { AddressModule } from './address/address.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    MealPlansModule,
    SubscriptionsModule,
    TestimonialModule,
    AddressModule,
    CustomerModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
