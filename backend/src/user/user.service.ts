import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from 'shared/type/user/dto/create-user.dto';
import { LoginDto } from 'shared/type/user/dto/login.dto';
import { UpdateUserDto } from 'shared/type/user/dto/update-user.dto';
import { BcryptCrypto } from '../crypto/bcrypt.crypto';
import { TokenService } from '../token-module/token.service';
import { UserEntity } from './entity/user.entity';
import { UserFactory } from './entity/user.factory';
import { UserRepository } from './entity/user.repository';
import { USER_MESSAGES } from './user.constant';
import { Token } from 'shared/type/token.interface';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly bcryptCrypto: BcryptCrypto,
    private readonly tokenService: TokenService,
  ) {}

  public async createUser(dto: CreateUserDto): Promise<UserEntity> {
    const {
      email,
      name,
      password,
      gender,
      profilePictureId,
      role,
      location,
      dateOfBirth,
    } = dto;
    this.logger.log(`Attempting to create user with email: ${email}`);

    const existUser = await this.userRepository.findByEmail(email);
    if (existUser) {
      this.logger.warn(`User with email '${email}' already exists`);
      throw new ConflictException(USER_MESSAGES.EXISTS);
    }

    const hashPassword = await this.bcryptCrypto.hashPassword(password);
    //todo avatarId description
    const userData = {
      name: name,
      email: email,
      dateOfBirth: dateOfBirth,
      location: location,
      password: hashPassword,
      gender: gender,
      role: role,
      profilePictureId: profilePictureId,
      avatarId: '(none)',
      description: '(none)',
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
      throw new NotFoundException(USER_MESSAGES.NOT_FOUND);
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
    if (dto.password !== undefined)
      updatedUser.password = await this.bcryptCrypto.hashPassword(dto.password);
    if (dto.dateOfBirth !== undefined)
      updatedUser.dateOfBirth = dto.dateOfBirth;
    if (dto.location !== undefined) updatedUser.location = dto.location;
    if (dto.gender !== undefined) updatedUser.gender = dto.gender;
    if (dto.role !== undefined) updatedUser.role = dto.role;
    if (dto.profilePictureId !== undefined)
      updatedUser.profilePictureId = dto.profilePictureId;
    if (dto.avatarId !== undefined) updatedUser.avatarId = dto.avatarId;

    return this.userRepository.update(userId, updatedUser);
  }

  public async deleteUserById(userId: string): Promise<UserEntity> {
    this.logger.log(`Deleting user with ID: '${userId}'`);
    const foundUser = await this.userRepository.findById(userId);
    if (!foundUser) {
      this.logger.warn(`User not found with ID: '${userId}'`);
      throw new NotFoundException(USER_MESSAGES.NOT_FOUND);
    }

    const deletedUser = await this.userRepository.deleteById(userId);
    this.logger.log(`User with ID: '${userId}' deleted`);

    return deletedUser;
  }

  public async exists(userId: string): Promise<boolean> {
    return this.userRepository.exists(userId);
  }

  public async verifyUser(dto: LoginDto): Promise<UserEntity> {
    this.logger.log(`Verifying user: ${dto.email}`);
    const { email, password } = dto;

    const existUser = await this.userRepository.findByEmail(email);
    if (!existUser) {
      this.logger.warn(`User not found with email: '${email}'`);
      throw new NotFoundException(USER_MESSAGES.NOT_FOUND);
    }

    const isPasswordCorrect = await this.bcryptCrypto.verifyPassword(
      password,
      existUser.password,
    );
    if (!isPasswordCorrect) {
      this.logger.warn(`Incorrect password attempt for user: ${dto.email}`);
      throw new UnauthorizedException(
        USER_MESSAGES.AUTHENTICATION_PASSWORD_WRONG,
      );
    }
    this.logger.log(`User verified: ${existUser.email}`);

    return existUser;
  }

  public async createUserToken(user: UserEntity): Promise<Token> {
    return this.tokenService.createUserToken(user);
  }

  public async getUserByEmail(email: string): Promise<UserEntity> {
    this.logger.log(`Attempting to retrieve user by email: ${email}`);
    const existUser = await this.userRepository.findByEmail(email);
    if (!existUser) {
      this.logger.warn(`No user found with email: ${email}`);
      throw new NotFoundException(USER_MESSAGES.NOT_FOUND);
    }

    return existUser;
  }
}
