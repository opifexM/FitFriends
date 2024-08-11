import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
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
    this.logger.log(`Searching for user by email: ${email}`);
    const foundDocument = await this.model
      .findOne({ email: email })
      .select('password email');

    return this.createEntityFromDocument(foundDocument);
  }
}
