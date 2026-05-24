import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { TestimonialService } from './testimonial.service';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';
import { Public } from 'src/auth/public.decorator';
import type { RequestWithUser } from 'src/auth/interface/request-with-user.interface';
import { Prisma } from 'src/generated/prisma/client';

@Controller('testimonial')
export class TestimonialController {
  constructor(private readonly testimonialService: TestimonialService) {}

  @Post()
  create(
    @Body() createTestimonial: Prisma.TestimonialCreateInput,
    @Req() req: RequestWithUser,
  ) {
    return this.testimonialService.create(createTestimonial, req);
  }

  @Public()
  @Get()
  findAll() {
    return this.testimonialService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testimonialService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTestimonialDto: UpdateTestimonialDto,
  ) {
    return this.testimonialService.update(+id, updateTestimonialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testimonialService.remove(+id);
  }
}
