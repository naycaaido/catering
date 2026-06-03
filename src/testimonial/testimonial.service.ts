import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';
import { DatabaseService } from 'src/database/database.service';
import { RequestWithUser } from 'src/auth/interface/request-with-user.interface';

@Injectable()
export class TestimonialService {
  constructor(private prisma: DatabaseService) {}
  async create(
    createTestimonialDto: CreateTestimonialDto,
    req: RequestWithUser,
  ) {
    const custId = req.user.profileId;
    const subscription = await this.prisma.subscription.findUnique({
      where: { id: createTestimonialDto.subscription_id },
    });
    if (!subscription) throw new BadRequestException();
    if (createTestimonialDto.rating < 0 || createTestimonialDto.rating > 5)
      throw new BadRequestException();

    if (
      subscription.status === 'ACTIVE' ||
      subscription.status === 'COMPLETED'
    ) {
      const testimoni = await this.prisma.testimonial.create({
        data: {
          customerId: custId,
          subscriptionId: createTestimonialDto.subscription_id,
          review: createTestimonialDto.review,
          rating: createTestimonialDto.rating,
        },
      });

      return testimoni;
    }
  }

  findAll() {
    return `This action returns all testimonial`;
  }

  findOne(id: number) {
    return `This action returns a #${id} testimonial`;
  }

  update(id: number, updateTestimonialDto: UpdateTestimonialDto) {
    return `This action updates a #${id} testimonial`;
  }

  remove(id: number) {
    return `This action removes a #${id} testimonial`;
  }
}
