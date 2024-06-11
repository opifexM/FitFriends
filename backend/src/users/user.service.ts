import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entity/user.entity';
import { UserFactory } from './entity/user.factory';
import { UserRepository } from './entity/user.repository';
import { USER_NOT_FOUND } from './user.constant';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly userRepository: UserRepository) {}

  public async createUser(dto: CreateUserDto): Promise<UserEntity> {
    this.logger.log(`Attempting to create user with email: ${dto.email}`);

    const userData = {
      name: dto.name,
      email: dto.email,
      age: dto.age,
    };

    const userEntity = UserFactory.createEntity(userData);
    const createdUser = await this.userRepository.save(userEntity);
    this.logger.log(`User created with ID: '${createdUser.id}'`);

    return createdUser;
  }

  public async findUserById(userId: string): Promise<UserEntity> {
    this.logger.log(`Looking for user with ID: '${userId}'`);
    const foundUser = await this.userRepository.findById(userId);
    if (!foundUser) {
      this.logger.warn(`User not found with ID: '${userId}'`);
      throw new NotFoundException(USER_NOT_FOUND);
    }

    return foundUser;
  }

  public async updateUserById(
    userId: string,
    dto: UpdateUserDto,
  ): Promise<UserEntity> {
    this.logger.log(`Updating user with ID: '${userId}'`);
    const updatedUser = await this.findUserById(userId);

    if (dto.name !== undefined) updatedUser.name = dto.name;
    if (dto.email !== undefined) updatedUser.email = dto.email;
    if (dto.age !== undefined) updatedUser.age = dto.age;

    return this.userRepository.update(userId, updatedUser);
  }

  public async deleteUserById(userId: string): Promise<UserEntity> {
    this.logger.log(`Deleting user with ID: '${userId}'`);
    const foundUser = await this.userRepository.findById(userId);
    if (!foundUser) {
      this.logger.warn(`User not found with ID: '${userId}'`);
      throw new NotFoundException(USER_NOT_FOUND);
    }

    const deletedUser = await this.userRepository.deleteById(userId);
    this.logger.log(`User with ID: '${userId}' deleted`);

    return deletedUser;
  }

  public async exists(userId: string): Promise<boolean> {
    return this.userRepository.exists(userId);
  }
}
