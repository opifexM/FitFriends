import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateBalanceDto } from 'shared/type/balance/dto/create-balance.dto';
import { UpdateBalanceDto } from 'shared/type/balance/dto/update-balance.dto';
import { TRAINING_MESSAGES } from '../training/training.constant';
import { TrainingService } from '../training/training.service';
import { USER_MESSAGES } from '../user/user.constant';
import { UserService } from '../user/user.service';
import { BALANCE_MESSAGES } from './balance.constant';
import { BalanceEntity } from './entity/balance.entity';
import { BalanceFactory } from './entity/balance.factory';
import { BalanceRepository } from './entity/balance.repository';

@Injectable()
export class BalanceService {
  private readonly logger = new Logger(BalanceService.name);

  constructor(
    private readonly balanceRepository: BalanceRepository,
    private readonly userService: UserService,
    private readonly trainingService: TrainingService,
  ) {}

  public async createBalance(dto: CreateBalanceDto): Promise<BalanceEntity> {
    const { user, training, count } = dto;
    this.logger.log('Attempting to create balance');

    const foundUser = await this.userService.findUserById(user);
    if (!foundUser) {
      this.logger.warn(`User with id '${user}' not found`);
      throw new NotFoundException(USER_MESSAGES.NOT_FOUND);
    }

    const foundTraining = await this.trainingService.findTrainingById(training);
    if (!foundTraining) {
      this.logger.warn(`Training with id '${training}' not found`);
      throw new NotFoundException(TRAINING_MESSAGES.NOT_FOUND);
    }

    const balanceData = {
      user: foundUser.id,
      training: foundTraining.id,
      count: count,
    };

    const balanceEntity = BalanceFactory.createEntity(balanceData);
    const createdBalance = await this.balanceRepository.save(balanceEntity);
    this.logger.log(`Balance created with ID: '${createdBalance.id}'`);

    return createdBalance;
  }

  public async findBalanceById(balanceId: string): Promise<BalanceEntity> {
    this.logger.log(`Looking for balance with ID: '${balanceId}'`);
    const foundBalance = await this.balanceRepository.findById(balanceId);
    if (!foundBalance) {
      this.logger.warn(`Balance not found with ID: '${balanceId}'`);
      throw new NotFoundException(BALANCE_MESSAGES.NOT_FOUND);
    }

    return foundBalance;
  }

  public async updateBalanceById(
    balanceId: string,
    dto: UpdateBalanceDto,
  ): Promise<BalanceEntity> {
    this.logger.log(`Updating balance with ID: '${balanceId}'`);
    const updatedBalance = await this.findBalanceById(balanceId);

    if (dto.count !== undefined) updatedBalance.count = dto.count;

    return this.balanceRepository.update(balanceId, updatedBalance);
  }

  public async deleteBalanceById(balanceId: string): Promise<BalanceEntity> {
    this.logger.log(`Deleting balance with ID: '${balanceId}'`);
    const foundBalance = await this.balanceRepository.findById(balanceId);
    if (!foundBalance) {
      this.logger.warn(`Balance not found with ID: '${balanceId}'`);
      throw new NotFoundException(BALANCE_MESSAGES.NOT_FOUND);
    }

    const deletedBalance = await this.balanceRepository.deleteById(balanceId);
    this.logger.log(`Balance with ID: '${balanceId}' deleted`);

    return deletedBalance;
  }

  public async exists(balanceId: string): Promise<boolean> {
    return this.balanceRepository.exists(balanceId);
  }
}
