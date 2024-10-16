import {
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { BalanceTrainingQuery } from 'shared/type/balance/balance-training.query';
import { BALANCE_PURCHASE_LIST } from 'shared/type/balance/balance.constant';
import { PurchaseStatusType } from 'shared/type/enum/purchase-status-type.enum';
import { PaginationResult } from 'shared/type/pagination.interface';
import { TrainingEntity } from '../training/entity/training.entity';
import { TrainingService } from '../training/training.service';
import { UserEntity } from '../user/entity/user.entity';
import { BALANCE_MESSAGES } from './balance.constant';
import { BalanceEntity } from './entity/balance.entity';
import { BalanceFactory } from './entity/balance.factory';
import { BalanceRepository } from './entity/balance.repository';

@Injectable()
export class BalanceService {
  private readonly logger = new Logger(BalanceService.name);

  constructor(
    private readonly balanceRepository: BalanceRepository,
    private readonly trainingService: TrainingService,
  ) {}

  public async createBalance(
    user: UserEntity,
    training: TrainingEntity,
    count: number,
  ): Promise<BalanceEntity> {
    this.logger.log(`Attempting to create balance for user '${user.name}'`);

    const balanceData = {
      user: user.id,
      training: training.id,
      totalCount: count,
      availableCount: count,
      purchaseStatus: PurchaseStatusType.NOT_STARTED,
    };

    const balanceEntity = BalanceFactory.createEntity(balanceData);
    const createdBalance = await this.balanceRepository.save(balanceEntity);
    this.logger.log(
      `Balance created with ID: '${createdBalance.id}' user '${user.name}' and training '${training.name}'`,
    );

    return createdBalance;
  }

  public async updateBalanceById(
    balance: BalanceEntity,
    user: UserEntity,
    count: number,
  ): Promise<BalanceEntity> {
    this.logger.log(
      `Updating balance with ID: '${balance.id}' for user '${user.name}'`,
    );

    if (user.id !== balance.user.toString()) {
      this.logger.warn(
        `User ID '${user.id}' attempted to balance access owned by User ID '${balance.user.toString()}'`,
      );
      throw new ForbiddenException(BALANCE_MESSAGES.NO_ACCESS);
    }

    balance.totalCount += count;
    balance.availableCount += count;
    balance.purchaseStatus = PurchaseStatusType.NOT_STARTED;

    return this.balanceRepository.update(balance.id, balance);
  }

  public async createOrUpdateBalance(
    user: UserEntity,
    training: TrainingEntity,
    count: number,
  ): Promise<BalanceEntity> {
    this.logger.log(
      `Attempting to create or update balance for user '${user.name}' and training '${training.name}'`,
    );

    const foundBalance = await this.balanceRepository.findByUserIdAndTrainingId(
      user.id,
      training.id,
    );
    if (foundBalance) {
      return this.updateBalanceById(foundBalance, user, count);
    } else {
      return this.createBalance(user, training, count);
    }
  }

  public async findBalanceById(
    userId: string,
    balanceId: string,
  ): Promise<BalanceEntity> {
    this.logger.log(`Looking for balance with ID: '${balanceId}'`);
    const foundBalance = await this.balanceRepository.findById(balanceId);
    if (!foundBalance) {
      this.logger.warn(`Balance not found with ID: '${balanceId}'`);
      throw new NotFoundException(BALANCE_MESSAGES.NOT_FOUND);
    }
    if (userId !== foundBalance.user.toString()) {
      this.logger.warn(
        `User ID '${userId}' do not have access to balance ID '${balanceId}'`,
      );
      throw new ForbiddenException(BALANCE_MESSAGES.NO_ACCESS);
    }

    return foundBalance;
  }

  public async deleteBalanceById(balanceId: string): Promise<BalanceEntity> {
    this.logger.log(`Deleting balance with ID: '${balanceId}'`);
    await this.balanceRepository.findById(balanceId);
    const deletedBalance = await this.balanceRepository.deleteById(balanceId);
    this.logger.log(`Balance with ID: '${balanceId}' deleted`);

    return deletedBalance;
  }

  public async exists(balanceId: string): Promise<boolean> {
    return this.balanceRepository.exists(balanceId);
  }

  public async findAllPurchaseTraining(
    userId: string,
    balanceQuery?: BalanceTrainingQuery,
  ): Promise<PaginationResult<TrainingEntity>> {
    const limit = Math.min(
      balanceQuery?.limit ?? Number.MAX_VALUE,
      BALANCE_PURCHASE_LIST.LIMIT,
    );
    const page =
      balanceQuery?.currentPage ?? BALANCE_PURCHASE_LIST.DEFAULT_FILTER_PAGE;
    const isActive = balanceQuery?.active ?? false;

    this.logger.log(
      `Finding all purchase training by user ID: '${userId}', active: '${isActive}'`,
    );

    const trainingListIds = await this.balanceRepository.findAllIdsByUserId(
      userId,
      isActive,
    );

    return this.trainingService.findTrainingByIdList(
      trainingListIds,
      page,
      limit,
    );
  }

  public async findAllBalances(userId: string): Promise<BalanceEntity[]> {
    this.logger.log(`Finding all balances by user ID: '${userId}'`);

    return this.balanceRepository.findAllByUserId(userId, true);
  }

  public async activatePurchase(userId: string, balanceId: string) {
    this.logger.log(
      `Activate purchase with balance ID: '${balanceId}', User ID: '${userId}'`,
    );
    const foundBalance = await this.balanceRepository.findById(balanceId);
    if (foundBalance.purchaseStatus === PurchaseStatusType.IN_PROGRESS) {
      this.logger.warn(
        `User ID '${userId}' cannot activate because purchase Status '${foundBalance.purchaseStatus}' is active`,
      );
      throw new ForbiddenException(BALANCE_MESSAGES.IN_PROGRESS);
    }
    if (foundBalance.availableCount < 1) {
      this.logger.warn(
        `User ID '${userId}' don't have enough balance '${foundBalance.availableCount}' for activation`,
      );
      throw new ForbiddenException(BALANCE_MESSAGES.NOT_ENOUGH_BALANCE);
    }

    foundBalance.availableCount--;
    foundBalance.purchaseStatus = PurchaseStatusType.IN_PROGRESS;

    return this.balanceRepository.update(foundBalance.id, foundBalance);
  }

  public async deactivatePurchase(userId: string, balanceId: string) {
    this.logger.log(
      `Deactivate purchase with balance ID: '${balanceId}', User ID: '${userId}'`,
    );
    const foundBalance = await this.balanceRepository.findById(balanceId);
    if (foundBalance.purchaseStatus !== PurchaseStatusType.IN_PROGRESS) {
      this.logger.warn(
        `User ID '${userId}' cannot deactivated because purchase Status '${foundBalance.purchaseStatus}' is not active`,
      );
      throw new ForbiddenException(BALANCE_MESSAGES.NOT_ACTIVE);
    }

    foundBalance.purchaseStatus =
      foundBalance.availableCount > 0
        ? PurchaseStatusType.NOT_STARTED
        : PurchaseStatusType.FINISHED;

    return this.balanceRepository.update(foundBalance.id, foundBalance);
  }
}
