import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from '../file-module/file.module';
import { UserModule } from '../user/user.module';
import { QuestionnaireRepository } from './entity/questionnaire.repository';
import {
  QuestionnaireModel,
  QuestionnaireSchema,
} from './entity/questionnaire.schema';
import { QuestionnaireController } from './questionnaire.controller';
import { QuestionnaireService } from './questionnaire.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: QuestionnaireModel.name, schema: QuestionnaireSchema },
    ]),
    forwardRef(() => UserModule),
    FileModule,
  ],
  controllers: [QuestionnaireController],
  providers: [QuestionnaireService, QuestionnaireRepository],
  exports: [QuestionnaireService],
})
export class QuestionnaireModule {}
