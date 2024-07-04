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
  Req,
  UseGuards,
} from '@nestjs/common';
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
import { CreateUserDto } from 'shared/type/user/dto/create-user.dto';
import { LoggedDto } from 'shared/type/user/dto/logged.dto';
import { LoginDto } from 'shared/type/user/dto/login.dto';
import { UpdateUserDto } from 'shared/type/user/dto/update-user.dto';
import { UserDto } from 'shared/type/user/dto/user.dto';
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
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: UserDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  public async createUser(@Body() dto: CreateUserDto): Promise<UserDto> {
    this.logger.log(`Creating new user with email: '${dto.email}'`);
    const createdUser = await this.userService.createUser(dto);

    return fillDto(UserDto, createdUser.toPOJO());
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
  ): Promise<UserDto> {
    this.logger.log(`Updating user with ID '${userId}'`);
    const updatedUser = await this.userService.updateUserById(userId, dto);

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
}
