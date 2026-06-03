import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTestimonialDto {
  @IsString()
  @IsNotEmpty()
  subscription_id: string;

  @IsString()
  review: string;

  @IsNotEmpty()
  rating: number;
}
