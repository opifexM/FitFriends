import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BalanceModule } from './balance/balance.module';
import { AppConfiguration } from './config/app-configuration.service';
import { validate } from './config/server.env';
import { DatabaseModule } from './database/database.module';
import { NotifyModule } from './notify/notify.module';
import { OrderModule } from './order/order.module';
import { QuestionnaireModule } from './questionnaire/questionnaire.module';
import { ReviewModule } from './review/review.module';
import { TrainingModule } from './training/traning.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'server.env',
      validate,
    }),
    DatabaseModule,
    UserModule,
    QuestionnaireModule,
    BalanceModule,
    TrainingModule,
    ReviewModule,
    OrderModule,
    NotifyModule,
  ],
  controllers: [],
  providers: [AppConfiguration],
  exports: [],
})
export class AppModule {}
