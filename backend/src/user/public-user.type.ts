import { PublicUserDto } from 'shared/type/user/dto/public-user.dto';
import { QuestionnaireEntity } from '../questionnaire/entity/questionnaire.entity';
import { UserEntity } from './entity/user.entity';

export type UserQuestionnairePublic = UserEntity &
  QuestionnaireEntity &
  PublicUserDto;
