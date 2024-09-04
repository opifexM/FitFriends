import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { fillDto } from 'shared/lib/common';
import { TokenPayload } from 'shared/type/token-payload.interface';
import { Token } from 'shared/type/token.interface';
import { TrainingQuery } from 'shared/type/training/training.query';
import { CreateUserDto } from 'shared/type/user/dto/create-user.dto';
import { LoggedDto } from 'shared/type/user/dto/logged.dto';
import { LoginDto } from 'shared/type/user/dto/login.dto';
import { PublicUserPaginationDto } from 'shared/type/user/dto/public-user-pagination.dto';
import { PublicUserDto } from 'shared/type/user/dto/public-user.dto';
import { UpdateUserDto } from 'shared/type/user/dto/update-user.dto';
import { UserDto } from 'shared/type/user/dto/user.dto';
import { PublicUserQuery } from 'shared/type/user/public-user.query';
import { MongoIdValidationPipe } from '../database/mongo-id-validation.pipe';
import { GetUserId } from '../decorator/get-user.decorator';
import { JwtAuthGuard } from './authentication/guard/jwt-auth.guard';
import { JwtRefreshGuard } from './authentication/guard/jwt-refresh.guard';
import { LocalAuthGuard } from './authentication/guard/local-auth.guard';
import { RequestWithTokenPayload } from './authentication/request-with-token-payload.interface';
import { RequestWithUser } from './authentication/request-with-user.interface';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @Post('')
  @UseInterceptors(FileInterceptor('avatarFile'))
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: UserDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  public async createUser(
    @Body() dto: CreateUserDto,
    @UploadedFile() avatarFile?: Express.Multer.File,
  ): Promise<UserDto> {
    this.logger.log(
      `Creating new user with email: '${dto.email}', Avatar file: '${avatarFile}'`,
    );
    const createdUser = await this.userService.createUser(dto, avatarFile);

    return fillDto(UserDto, createdUser.toPOJO());
  }

  @Get('public/:publicUserId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get public user profile by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The public user profile has been successfully retrieved.',
    type: UserDto,
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  public async getUserPublicProfileById(
    @Param('publicUserId', MongoIdValidationPipe) publicUserId: string,
    @GetUserId() currentUserId: string,
  ): Promise<PublicUserDto> {
    this.logger.log(
      `Retrieving public user profile with ID: '${publicUserId}'`,
    );
    const publicUserData = await this.userService.findPublicUserProfileById(
      currentUserId,
      publicUserId,
    );

    return fillDto(PublicUserDto, publicUserData);
  }

  @Get('/looking-for-training')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get users who are looking for a joint training' })
  @ApiResponse({
    status: 200,
    description:
      'The users who are looking for a joint training successfully retrieved.',
    type: PublicUserPaginationDto,
  })
  @ApiResponse({ status: 404, description: 'Users not found.' })
  public async getLookingTrainingUsers(
    @GetUserId() userId: string,
  ): Promise<PublicUserPaginationDto> {
    this.logger.log(`Retrieving 'looking for training' user list`);
    return this.userService.findLookingForTraining(userId);
  }

  @Get('/public-users')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get public user list' })
  @ApiResponse({
    status: 200,
    description: 'The public user list successfully retrieved.',
    type: PublicUserPaginationDto,
  })
  @ApiResponse({ status: 404, description: 'Public user list not found.' })
  public async getPublicUsers(
    @GetUserId() userId: string,
    @Query() publicUserQuery: PublicUserQuery,
  ): Promise<PublicUserPaginationDto> {
    this.logger.log(
      `Retrieving public user list with query: ${JSON.stringify(publicUserQuery)}'`,
    );

    return this.userService.findPublicUsers(userId, publicUserQuery);
  }

  @Get(':userId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully retrieved.',
    type: UserDto,
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  public async getUserById(
    @Param('userId', MongoIdValidationPipe) userId: string,
  ): Promise<UserDto> {
    this.logger.log(`Retrieving user with ID: '${userId}'`);
    const foundUser = await this.userService.findUserById(userId);

    return fillDto(UserDto, foundUser.toPOJO());
  }

  @Get('')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user' })
  @ApiResponse({
    status: 200,
    description: 'The current user has been successfully retrieved.',
    type: UserDto,
  })
  @ApiResponse({ status: 404, description: 'Current user not found.' })
  public async getUser(@GetUserId() userId: string): Promise<UserDto> {
    this.logger.log(`Retrieving current user with ID: '${userId}'`);
    const foundUser = await this.userService.findUserById(userId);

    return fillDto(UserDto, foundUser.toPOJO());
  }

  @Patch('')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('avatarFile'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.',
    type: UserDto,
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  public async updateUser(
    @GetUserId() userId: string,
    @Body() dto: UpdateUserDto,
    @UploadedFile() avatarFile?: Express.Multer.File,
  ): Promise<UserDto> {
    this.logger.log(
      `Updating user with ID '${userId}', Avatar file: '${avatarFile}'`,
    );
    const updatedUser = await this.userService.updateUserById(
      userId,
      dto,
      avatarFile,
    );

    return fillDto(UserDto, updatedUser.toPOJO());
  }

  @Delete('')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully deleted.',
    type: UserDto,
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  public async deleteUser(@GetUserId() userId: string): Promise<UserDto> {
    this.logger.log(`Attempting to delete user with ID: ${userId}`);
    const deletedUser = await this.userService.deleteUserById(userId);
    this.logger.log(`User deleted with ID: '${deletedUser.id}'`);

    return fillDto(UserDto, deletedUser.toPOJO());
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Log in a user' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Login successful',
    type: LoginDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'User password is empty',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User password is wrong',
  })
  public async login(@Req() { user }: RequestWithUser): Promise<LoggedDto> {
    this.logger.log(`User logged in successfully: ${user.email}`);
    const userToken = await this.userService.createUserToken(user);

    return fillDto(LoggedDto, { ...userToken, ...user.toPOJO() });
  }

  @Post('check')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Check validity of the access token' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Access token is valid' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized if token is invalid or expired',
  })
  public async checkToken(
    @Req() { user: payload }: RequestWithTokenPayload,
  ): Promise<TokenPayload> {
    this.logger.log('Check JWT access token');

    return payload;
  }

  @Post('refresh')
  @UseGuards(JwtRefreshGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh access and refresh tokens' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'New access and refresh tokens provided',
  })
  public async refreshToken(@Req() { user }: RequestWithUser): Promise<Token> {
    return this.userService.createUserToken(user);
  }

  @Post('subscription/:subscribeUserId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Subscribe user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'User subscribed' })
  public async subscribeUser(
    @Param('subscribeUserId', MongoIdValidationPipe) subscribeUserId: string,
    @GetUserId() currentUserId: string,
  ): Promise<PublicUserDto> {
    this.logger.log(
      `Subscribing user '${currentUserId}' to user '${subscribeUserId}'`,
    );

    const publicUserData = await this.userService.subscribeUserById(
      currentUserId,
      subscribeUserId,
    );

    return fillDto(PublicUserDto, publicUserData);
  }

  @Delete('subscription/:unsubscribeUserId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Unsubscribe user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'User unsubscribed' })
  public async unsubscribeUser(
    @Param('unsubscribeUserId', MongoIdValidationPipe)
    unsubscribeUserId: string,
    @GetUserId() currentUserId: string,
  ): Promise<PublicUserDto> {
    this.logger.log(
      `Unsubscribing user '${currentUserId}' from user '${unsubscribeUserId}'`,
    );
    const publicUserData = await this.userService.unsubscribeUserById(
      currentUserId,
      unsubscribeUserId,
    );

    return fillDto(PublicUserDto, publicUserData);
  }
}
