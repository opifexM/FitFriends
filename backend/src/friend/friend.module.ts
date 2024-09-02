import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionnaireModule } from '../questionnaire/questionnaire.module';
import { UserModule } from '../user/user.module';
import { FriendRepository } from './entity/friend.repository';
import { FriendModel, FriendSchema } from './entity/friend.schema';
import { FriendController } from './friend.controller';
import { FriendService } from './friend.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FriendModel.name, schema: FriendSchema },
    ]),
    forwardRef(() => UserModule),
    forwardRef(() => QuestionnaireModule),
  ],
  controllers: [FriendController],
  providers: [FriendService, FriendRepository],
  exports: [FriendService],
})
export class FriendModule {}
