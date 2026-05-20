import { Module } from '@nestjs/common';
import { TestimonialService } from './testimonial.service';
import { TestimonialController } from './testimonial.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [TestimonialController],
  providers: [TestimonialService],
  imports: [DatabaseModule],
})
export class TestimonialModule {}
