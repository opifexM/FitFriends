import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { fillDto } from 'shared/lib/common';
import { MongoIdValidationPipe } from '../database/mongo-id-validation.pipe';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRdo } from './rdo/user.rdo';
import { UserService } from './user.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

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
    type: UserRdo,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  public async createUser(@Body() dto: CreateUserDto): Promise<UserRdo> {
    this.logger.log(`Creating new user with email: '${dto.email}'`);
    const createdUser = await this.userService.createUser(dto);

    return fillDto(UserRdo, createdUser.toPOJO());
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully retrieved.',
    type: UserRdo,
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  public async getUser(
    @Param('userId', MongoIdValidationPipe) userId: string,
  ): Promise<UserRdo> {
    this.logger.log(`Retrieving user with ID: '${userId}'`);
    const foundUser = await this.userService.findUserById(userId);

    return fillDto(UserRdo, foundUser.toPOJO());
  }

  @Patch(':userId')
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.',
    type: UserRdo,
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  public async updateUser(
    @Param('userId', MongoIdValidationPipe) userId: string,
    @Body() dto: UpdateUserDto,
  ): Promise<UserRdo> {
    this.logger.log(`Updating user with ID '${userId}'`);
    const updatedUser = await this.userService.updateUserById(userId, dto);

    return fillDto(UserRdo, updatedUser.toPOJO());
  }

  @Delete(':userId')
  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully deleted.',
    type: UserRdo,
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  public async deleteUser(
    @Param('userId', MongoIdValidationPipe) userId: string,
  ): Promise<UserRdo> {
    this.logger.log(`Attempting to delete user with ID: ${userId}`);
    const deletedUser = await this.userService.deleteUserById(userId);
    this.logger.log(`User deleted with ID: '${deletedUser.id}'`);

    return fillDto(UserRdo, deletedUser.toPOJO());
  }
}
