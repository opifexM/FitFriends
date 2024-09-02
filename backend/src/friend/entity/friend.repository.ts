import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Document, Model } from 'mongoose';
import { FriendQuery } from 'shared/type/friend/friend.query';
import { PaginationResult } from 'shared/type/pagination.interface';
import { BaseRepository } from '../../database/base-mongo.repository';
import { FriendEntity } from './friend.entity';
import { FriendFactory } from './friend.factory';
import { FriendModel } from './friend.schema';

@Injectable()
export class FriendRepository extends BaseRepository<FriendEntity> {
  constructor(
    @InjectModel(FriendModel.name)
    private friendModel: Model<FriendModel>,
  ) {
    super(friendModel as any, FriendRepository.name);
  }

  protected createEntityFromDocument(
    entityDocument: Document,
  ): FriendEntity | null {
    if (!entityDocument) {
      return null;
    }

    const plainObject = entityDocument.toObject({ versionKey: false });
    return FriendFactory.createEntity(plainObject);
  }

  public async findByIdWithPublicUser(
    friendId: string,
  ): Promise<FriendEntity | null> {
    this.logger.log(`Finding friend connection by ID: '${friendId}'`);
    const foundDocument = await this.model
      .findById(new ObjectId(friendId))
      .populate('friend')
      .populate('friendInitiator');

    return this.createEntityFromDocument(foundDocument);
  }

  public async findFriendByIds(
    userInitiatorId: string,
    friendUserId: string,
  ): Promise<FriendEntity | null> {
    this.logger.log(
      `Searching for for users '${userInitiatorId}' and '${friendUserId}'`,
    );
    const foundDocument = await this.friendModel
      .findOne({
        $or: [
          { friendInitiator: userInitiatorId, friend: friendUserId },
          { friendInitiator: friendUserId, friend: userInitiatorId },
        ],
      })
      .populate('friend')
      .populate('friendInitiator');

    return this.createEntityFromDocument(foundDocument);
  }

  public async findAllFriendConnectionByUserId(
    userId: string,
    { limit, currentPage }: FriendQuery,
  ): Promise<PaginationResult<FriendEntity>> {
    const skip = (currentPage - 1) * limit;
    this.logger.log(
      `Retrieving friend connection, skip: '${skip}', limit: '${limit}'`,
    );

    const friends = await this.model
      .find({
        $or: [{ friendInitiator: userId }, { friend: userId }],
      })
      .skip(skip)
      .limit(limit)
      .populate('friend')
      .populate('friendInitiator');

    const friendCount = await this.model.countDocuments();

    this.logger.log(
      `Retrieved [${friends.length}] friend connections for user ID '${userId}'`,
    );

    return {
      entities: friends.map((friend) => this.createEntityFromDocument(friend)),
      totalPages: Math.ceil(friendCount / limit),
      currentPage: currentPage,
      totalItems: friendCount,
      itemsPerPage: limit,
    };
  }
}
