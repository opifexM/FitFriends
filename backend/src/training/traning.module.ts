import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailModule } from '../email/email.module';
import { FileModule } from '../file-module/file.module';
import { QuestionnaireModule } from '../questionnaire/questionnaire.module';
import { UserModule } from '../user/user.module';
import { TrainingRepository } from './entity/training.repository';
import { TrainingModel, TrainingSchema } from './entity/training.schema';
import { TrainingController } from './trainig.controller';
import { TrainingService } from './training.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TrainingModel.name, schema: TrainingSchema },
    ]),
    UserModule,
    QuestionnaireModule,
    FileModule,
    EmailModule,
  ],
  controllers: [TrainingController],
  providers: [TrainingService, TrainingRepository],
  exports: [TrainingService],
})
export class TrainingModule {}
