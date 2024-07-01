import {
  Controller,
  Get,
  Logger,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { fillDto } from 'shared/lib/common';
import { BalanceTrainingQuery } from 'shared/type/balance/balance-training.query';
import { BalanceDto } from 'shared/type/balance/dto/balance.dto';
import { TrainingPaginationDto } from 'shared/type/training/dto/training-pagination.dto';
import { MongoIdValidationPipe } from '../database/mongo-id-validation.pipe';
import { GetUserId } from '../decorator/get-user.decorator';
import { JwtAuthGuard } from '../user/authentication/guard/jwt-auth.guard';
import { BalanceService } from './balance.service';

@ApiTags('balances')
@Controller('balances')
export class BalanceController {
  private readonly logger = new Logger(BalanceController.name);

  constructor(private readonly balanceService: BalanceService) {}

  @Get('purchase')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user purchase list' })
  @ApiResponse({
    status: 200,
    description: 'The training purchase list has been successfully retrieved.',
    type: TrainingPaginationDto,
  })
  @ApiResponse({ status: 404, description: 'Purchase not found.' })
  public async getAllReviewByTrainingId(
    @GetUserId() userId: string,
    @Query() query: BalanceTrainingQuery,
  ): Promise<TrainingPaginationDto> {
    this.logger.log(`Retrieving training purchase list for user ID ${userId}'`);

    const trainingPaginationData =
      await this.balanceService.findAllPurchaseTraining(userId, query);

    return fillDto(TrainingPaginationDto, {
      ...trainingPaginationData,
      entities: trainingPaginationData.entities.map((product) =>
        product.toPOJO(),
      ),
    });
  }

  @Get(':balanceId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get balance by ID' })
  @ApiResponse({
    status: 200,
    description: 'The balance has been successfully retrieved.',
    type: BalanceDto,
  })
  @ApiResponse({ status: 404, description: 'Balance not found.' })
  public async getBalance(
    @Param('balanceId', MongoIdValidationPipe) balanceId: string,
    @GetUserId() userId: string,
  ): Promise<BalanceDto> {
    this.logger.log(`Retrieving balance with ID: '${balanceId}'`);
    const foundBalance = await this.balanceService.findBalanceById(
      userId,
      balanceId,
    );

    return fillDto(BalanceDto, foundBalance.toPOJO());
  }
}
