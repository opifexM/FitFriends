import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Document, Model, Promise } from 'mongoose';
import { EmailContactDto } from 'shared/type/email/dto/email-contact.dto';
import { BaseRepository } from '../../database/base-mongo.repository';
import { UserEntity } from './user.entity';
import { UserFactory } from './user.factory';
import { UserModel } from './user.schema';

@Injectable()
export class UserRepository extends BaseRepository<UserEntity> {
  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserModel>,
  ) {
    super(userModel as any, UserRepository.name);
  }

  protected createEntityFromDocument(
    entityDocument: Document,
  ): UserEntity | null {
    if (!entityDocument) {
      return null;
    }

    const plainObject = entityDocument.toObject({ versionKey: false });
    return UserFactory.createEntity(plainObject);
  }

  public async findByEmail(email: string): Promise<UserEntity | null> {
    this.logger.log(`Searching for user by email: '${email}'`);
    const foundDocument = await this.model
      .findOne({ email: email })
      .select('password email');

    return this.createEntityFromDocument(foundDocument);
  }

  public async findUserSubscription(
    subscriptions: ObjectId[],
  ): Promise<EmailContactDto[]> {
    this.logger.log(
      `Searching user for [${subscriptions.length}] subscriptions`,
    );

    const subscribedUsers = await this.model.find(
      { _id: { $in: subscriptions } },
      { email: 1, name: 1 },
    );

    this.logger.log(`Found [${subscribedUsers.length}] user subscriptions`);

    return subscribedUsers;
  }

  public async addSubscription(
    userId: string,
    subscriptionId: string,
  ): Promise<void> {
    this.logger.log(
      `Adding subscription '${subscriptionId}' to user '${userId}'`,
    );
    await this.model.findByIdAndUpdate(
      userId,
      {
        $addToSet: { subscriptions: subscriptionId },
      },
      { new: true },
    );
  }

  public async removeSubscription(
    userId: string,
    subscriptionId: string,
  ): Promise<void> {
    this.logger.log(
      `Removing subscription '${subscriptionId}' from user '${userId}'`,
    );
    await this.model.findByIdAndUpdate(
      userId,
      {
        $pull: { subscriptions: subscriptionId },
      },
      { new: true },
    );
  }
}
