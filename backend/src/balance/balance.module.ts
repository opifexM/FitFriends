import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TrainingModule } from '../training/traning.module';
import { UserModule } from '../user/user.module';
import { BalanceController } from './balance.controller';
import { BalanceService } from './balance.service';
import { BalanceRepository } from './entity/balance.repository';
import { BalanceModel, BalanceSchema } from './entity/balance.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BalanceModel.name, schema: BalanceSchema },
    ]),
    UserModule,
    TrainingModule,
  ],
  controllers: [BalanceController],
  providers: [BalanceService, BalanceRepository],
})
export class BalanceModule {}
