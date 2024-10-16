import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../user/user.module';
import { NotifyRepository } from './entity/notify.repository';
import { NotifyModel, NotifySchema } from './entity/notify.schema';
import { NotifyController } from './notify.controller';
import { NotifyService } from './notify.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: NotifyModel.name, schema: NotifySchema },
    ]),
    forwardRef(() => UserModule),
  ],
  controllers: [NotifyController],
  providers: [NotifyService, NotifyRepository],
  exports: [NotifyService],
})
export class NotifyModule {}
