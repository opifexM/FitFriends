import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
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
import { CreateFriendDto } from 'shared/type/friend/dto/create-friend.dto';
import { FriendPaginationDto } from 'shared/type/friend/dto/friend-pagination.dto';
import { FriendDto } from 'shared/type/friend/dto/friend.dto';
import { UpdateFriendDto } from 'shared/type/friend/dto/update-friend.dto';
import { FriendQuery } from 'shared/type/friend/friend.query';
import { MongoIdValidationPipe } from '../database/mongo-id-validation.pipe';
import { GetUserId } from '../decorator/get-user.decorator';
import { JwtAuthGuard } from '../user/authentication/guard/jwt-auth.guard';
import { FriendService } from './friend.service';

@ApiTags('friends')
@Controller('friends')
export class FriendController {
  private readonly logger = new Logger(FriendController.name);

  constructor(private readonly friendService: FriendService) {}

  @Get('my-friend')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get my friend connection list' })
  @ApiResponse({
    status: 200,
    description:
      'The my friend connection list has been successfully retrieved.',
    type: FriendPaginationDto,
  })
  public async getMyFriendConnection(
    @GetUserId() userId: string,
    @Query() query: FriendQuery,
  ): Promise<FriendPaginationDto> {
    this.logger.log(
      `Retrieving my friend connection for user: '${userId}' order list with query: '${JSON.stringify(query)}'`,
    );
    return this.friendService.findMyFriend(userId, query);
  }

  @Get(':friendId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get friend connection by ID' })
  @ApiResponse({
    status: 200,
    description: 'The friend connection has been successfully retrieved.',
    type: FriendDto,
  })
  @ApiResponse({ status: 404, description: 'Review not found.' })
  public async getReview(
    @Param('friendId', MongoIdValidationPipe) friendId: string,
  ): Promise<FriendDto> {
    this.logger.log(`Retrieving friend connection with ID: '${friendId}'`);
    const foundFriend =
      await this.friendService.findFriendConnectionByIdWithPublicUser(friendId);

    return fillDto(FriendDto, foundFriend.toPOJO());
  }

  @Post('')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new friend connection' })
  @ApiResponse({
    status: 201,
    description: 'The friend connection has been successfully created.',
    type: FriendDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  public async createFriendConnection(
    @Body() dto: CreateFriendDto,
    @GetUserId() userId: string,
  ): Promise<FriendDto> {
    this.logger.log('Creating new friend connection');
    const createdFriend = await this.friendService.createFriendConnection(
      userId,
      dto,
    );

    return fillDto(FriendDto, createdFriend.toPOJO());
  }

  @Patch(':friendId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update friend connection with new training status',
  })
  @ApiResponse({
    status: 201,
    description: 'The friend connection has been successfully updated.',
    type: FriendDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  public async updateFriendConnection(
    @Param('friendId', MongoIdValidationPipe) friendId: string,
    @Body() dto: UpdateFriendDto,
    @GetUserId() userId: string,
  ): Promise<FriendDto> {
    this.logger.log(`Update friend connection with ID '${friendId}'`);
    const createdFriend = await this.friendService.updateFriendConnection(
      userId,
      friendId,
      dto,
    );

    return fillDto(FriendDto, createdFriend.toPOJO());
  }

  @Delete(':friendId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete friend connection' })
  @ApiResponse({
    status: 201,
    description: 'The friend connection has been successfully deleted.',
    type: FriendDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  public async deleteFriendConnection(
    @Param('friendId', MongoIdValidationPipe) friendId: string,
    @GetUserId() userId: string,
  ): Promise<FriendDto> {
    this.logger.log(`Delete friend connection with ID '${friendId}'`);
    const createdFriend = await this.friendService.deleteFriendConnection(
      userId,
      friendId,
    );

    return fillDto(FriendDto, createdFriend.toPOJO());
  }
}
