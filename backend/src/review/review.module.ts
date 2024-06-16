import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TrainingModule } from '../training/traning.module';
import { UserModule } from '../user/user.module';
import { ReviewRepository } from './entity/review.repository';
import { ReviewModel, ReviewSchema } from './entity/review.schema';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ReviewModel.name, schema: ReviewSchema },
    ]),
    UserModule,
    TrainingModule,
  ],
  controllers: [ReviewController],
  providers: [ReviewService, ReviewRepository],
})
export class ReviewModule {}
