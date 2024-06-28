import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { fillDto } from 'shared/lib/common';
import { BalanceDto } from 'shared/type/balance/dto/balance.dto';
import { CreateBalanceDto } from 'shared/type/balance/dto/create-balance.dto';
import { UpdateBalanceDto } from 'shared/type/balance/dto/update-balance.dto';
import { MongoIdValidationPipe } from '../database/mongo-id-validation.pipe';
import { GetUserId } from '../decorator/get-user.decorator';
import { JwtAuthGuard } from '../user/authentication/guard/jwt-auth.guard';
import { BalanceService } from './balance.service';

@ApiTags('balances')
@Controller('balances')
export class BalanceController {
  private readonly logger = new Logger(BalanceController.name);

  constructor(private readonly balanceService: BalanceService) {}

  @Post('')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new balance' })
  @ApiResponse({
    status: 201,
    description: 'The balance has been successfully created.',
    type: BalanceDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  public async createBalance(
    @Body() dto: CreateBalanceDto,
    @GetUserId() userId: string,
  ): Promise<BalanceDto> {
    this.logger.log('Creating new balance');

    const createdBalance = await this.balanceService.createBalance(userId, dto);

    return fillDto(BalanceDto, createdBalance.toPOJO());
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

  @Patch(':balanceId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update balance' })
  @ApiResponse({
    status: 200,
    description: 'The balance has been successfully updated.',
    type: BalanceDto,
  })
  @ApiResponse({ status: 404, description: 'Balance not found.' })
  public async updateBalance(
    @Param('balanceId', MongoIdValidationPipe) balanceId: string,
    @Body() dto: UpdateBalanceDto,
    @GetUserId() userId: string,
  ): Promise<BalanceDto> {
    this.logger.log(`Updating balance with ID '${balanceId}'`);
    const updatedBalance = await this.balanceService.updateBalanceById(
      userId,
      balanceId,
      dto,
    );

    return fillDto(BalanceDto, updatedBalance.toPOJO());
  }

  @Delete(':balanceId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete balance by ID' })
  @ApiResponse({
    status: 200,
    description: 'The balance has been successfully deleted.',
    type: BalanceDto,
  })
  @ApiResponse({ status: 404, description: 'Balance not found.' })
  public async deleteBalance(
    @Param('balanceId', MongoIdValidationPipe) balanceId: string,
    @GetUserId() userId: string,
  ): Promise<BalanceDto> {
    this.logger.log(`Attempting to delete balance with ID: ${balanceId}`);
    const deletedBalance = await this.balanceService.deleteBalanceById(
      userId,
      balanceId,
    );
    this.logger.log(`Balance deleted with ID: '${deletedBalance.id}'`);

    return fillDto(BalanceDto, deletedBalance.toPOJO());
  }
}
