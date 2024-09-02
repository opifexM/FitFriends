import {
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { fillDto } from 'shared/lib/common';
import { RequestStatusType } from 'shared/type/enum/request-status-type.enum';
import { RoleType } from 'shared/type/enum/role-type.enum';
import { CreateFriendDto } from 'shared/type/friend/dto/create-friend.dto';
import { FriendPaginationDto } from 'shared/type/friend/dto/friend-pagination.dto';
import { UpdateFriendDto } from 'shared/type/friend/dto/update-friend.dto';
import { FRIEND_LIST } from 'shared/type/friend/friend.constant';
import { FriendQuery } from 'shared/type/friend/friend.query';
import { ORDER_LIST } from 'shared/type/order/order.constant';
import { QuestionnaireService } from '../questionnaire/questionnaire.service';
import { USER_MESSAGES } from '../user/user.constant';
import { UserService } from '../user/user.service';
import { FriendEntity } from './entity/friend.entity';
import { FriendFactory } from './entity/friend.factory';
import { FriendRepository } from './entity/friend.repository';
import { FRIEND_MESSAGES } from './friend.constant';

@Injectable()
export class FriendService {
  private readonly logger = new Logger(FriendService.name);

  constructor(
    private readonly friendRepository: FriendRepository,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    @Inject(forwardRef(() => QuestionnaireService))
    private readonly questionnaireService: QuestionnaireService,
  ) {}

  public async createFriendConnection(
    userInitiatorId: string,
    dto: CreateFriendDto,
  ): Promise<FriendEntity> {
    const { friend: friendUserId } = dto;
    this.logger.log('Attempting to create friend connection');
    if (userInitiatorId === friendUserId) {
      this.logger.warn(
        `User initiator and friend user have same id '${userInitiatorId}'`,
      );
      throw new NotFoundException(FRIEND_MESSAGES.SAME_USER);
    }

    const foundUserInitiator =
      await this.userService.findUserById(userInitiatorId);
    if (!foundUserInitiator) {
      this.logger.warn(`User initiator with id '${userInitiatorId}' not found`);
      throw new NotFoundException(USER_MESSAGES.NOT_FOUND);
    }
    if (foundUserInitiator.role !== RoleType.VISITOR) {
      this.logger.warn(
        `User initiator is not visitor. Role: '${foundUserInitiator.role}'`,
      );
      throw new NotFoundException(FRIEND_MESSAGES.ONLY_VISITOR);
    }

    const foundFriendUser = await this.userService.findUserById(friendUserId);
    if (!foundFriendUser) {
      this.logger.warn(`Friend user with id '${userInitiatorId}' not found`);
      throw new NotFoundException(USER_MESSAGES.NOT_FOUND);
    }

    const foundFriend = await this.findFriendConnectionByIds(
      foundUserInitiator.id,
      foundFriendUser.id,
    );
    if (foundFriend) {
      this.logger.warn(
        `Friend connection already exists for users '${foundUserInitiator.name}' and '${foundFriendUser.name}'`,
      );
      throw new NotFoundException(FRIEND_MESSAGES.EXIST);
    }

    const friendData = {
      friend: foundFriendUser.id,
      friendInitiator: foundUserInitiator.id,
      requestStatus: RequestStatusType.NONE,
    };

    const friendEntity = FriendFactory.createEntity(friendData);
    const createdFriend = await this.friendRepository.save(friendEntity);
    this.logger.log(
      `Friend connection created with ID: '${createdFriend.id}' for users '${foundUserInitiator.name}' and '${foundFriendUser.name}'`,
    );

    return createdFriend;
  }

  public async findFriendConnectionById(
    friendId: string,
  ): Promise<FriendEntity> {
    this.logger.log(`Looking for friend connection with ID: '${friendId}'`);
    const foundFriend = await this.friendRepository.findById(friendId);
    if (!foundFriend) {
      this.logger.warn(`Friend connection not found with ID: '${friendId}'`);
      throw new NotFoundException(FRIEND_MESSAGES.NOT_FOUND);
    }

    return foundFriend;
  }

  public async findFriendConnectionByIdWithPublicUser(
    friendId: string,
  ): Promise<FriendEntity> {
    this.logger.log(`Looking for friend connection with ID: '${friendId}'`);
    const foundFriend =
      await this.friendRepository.findByIdWithPublicUser(friendId);
    if (!foundFriend) {
      this.logger.warn(`Friend connection not found with ID: '${friendId}'`);
      throw new NotFoundException(FRIEND_MESSAGES.NOT_FOUND);
    }

    return foundFriend;
  }

  public async findFriendConnectionByIds(
    userInitiator: string,
    friendUser: string,
  ): Promise<FriendEntity> {
    this.logger.log(
      `Find friend connection for users ID '${userInitiator}' and ID '${friendUser}'`,
    );
    return this.friendRepository.findFriendByIds(userInitiator, friendUser);
  }

  public async updateFriendConnection(
    userId: string,
    friendId: string,
    dto: UpdateFriendDto,
  ): Promise<FriendEntity> {
    this.logger.log(`Updating friend connection with ID: '${friendId}'`);

    const updatedFriend = await this.findFriendConnectionById(friendId);
    if (
      userId !== updatedFriend.friendInitiator.toString() &&
      userId !== updatedFriend.friend.toString()
    ) {
      this.logger.warn(
        `User ID '${userId}' can not update this friend connection '${friendId}'`,
      );
      throw new ForbiddenException(FRIEND_MESSAGES.NO_ACCESS);
    }

    if (updatedFriend.requestStatus === RequestStatusType.NONE) {
      updatedFriend.requestInitiator = userId;
    } else if (userId === updatedFriend.requestInitiator) {
      this.logger.warn(
        `User ID '${userId}' initiated the request and must wait for a response friend connection '${updatedFriend.id}'`,
      );
      throw new ForbiddenException(FRIEND_MESSAGES.RESPONSE_WAIT);
    }

    if (dto.requestStatus !== undefined)
      updatedFriend.requestStatus = dto.requestStatus;

    return this.friendRepository.update(friendId, updatedFriend);
  }

  public async deleteFriendConnection(
    userId: string,
    friendId: string,
  ): Promise<FriendEntity> {
    this.logger.log(`Deleting friend connection with ID: '${friendId}'`);

    const deletedFriend = await this.findFriendConnectionById(friendId);
    if (
      userId !== deletedFriend.friendInitiator.toString() &&
      userId !== deletedFriend.friend.toString()
    ) {
      this.logger.warn(
        `User ID '${userId}' can not delete this friend connection '${friendId}'`,
      );
      throw new ForbiddenException(FRIEND_MESSAGES.NO_ACCESS);
    }

    return this.friendRepository.deleteById(friendId);
  }

  public async findMyFriend(
    userId: string,
    friendQuery?: FriendQuery,
  ): Promise<FriendPaginationDto> {
    this.logger.log(
      `Finding all my friend connections for user ID '${userId}'`,
    );

    const limit = Math.min(
      friendQuery?.limit ?? Number.MAX_VALUE,
      ORDER_LIST.LIMIT,
    );
    const currentPage =
      friendQuery?.currentPage ?? FRIEND_LIST.DEFAULT_FILTER_PAGE;

    const friendConnections =
      await this.friendRepository.findAllFriendConnectionByUserId(userId, {
        limit,
        currentPage,
      });

    const friendConnectionWithPublicProfiles = await Promise.all(
      friendConnections.entities.map(async (friendConnection) => {
        if (friendConnection.friend.id.toString() !== userId) {
          const questionnaire =
            await this.questionnaireService.findLatestQuestionnairePublicProfileByUserId(
              friendConnection.friend.id.toString(),
            );

          if (questionnaire) {
            return {
              ...friendConnection.toPOJO(),
              friend: {
                ...friendConnection.friend,
                ...questionnaire.toPOJO(),
                id: friendConnection.friend.id,
              },
            };
          } else {
            return {
              ...friendConnection.toPOJO(),
              friend: {
                ...friendConnection.friend,
                id: friendConnection.friend.id,
              },
            };
          }
        } else if (friendConnection.friendInitiator.id.toString() !== userId) {
          const questionnaire =
            await this.questionnaireService.findLatestQuestionnairePublicProfileByUserId(
              friendConnection.friendInitiator.id.toString(),
            );

          if (questionnaire) {
            return {
              ...friendConnection.toPOJO(),
              friendInitiator: {
                ...friendConnection.friendInitiator,
                ...questionnaire.toPOJO(),
                id: friendConnection.friendInitiator.id,
              },
            };
          } else {
            return {
              ...friendConnection.toPOJO(),
              friend: {
                ...friendConnection.friendInitiator,
                id: friendConnection.friendInitiator.id,
              },
            };
          }
        }
      }),
    );

    return fillDto(FriendPaginationDto, {
      ...friendConnections,
      entities: friendConnectionWithPublicProfiles,
    });
  }
}
