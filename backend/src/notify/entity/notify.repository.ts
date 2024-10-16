import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { BaseRepository } from '../../database/base-mongo.repository';
import { NotifyEntity } from './notify.entity';
import { NotifyFactory } from './notify.factory';
import { NotifyModel } from './notify.schema';

@Injectable()
export class NotifyRepository extends BaseRepository<NotifyEntity> {
  constructor(
    @InjectModel(NotifyModel.name)
    private notifyModel: Model<NotifyModel>,
  ) {
    super(notifyModel as any, NotifyRepository.name);
  }

  protected createEntityFromDocument(
    entityDocument: Document,
  ): NotifyEntity | null {
    if (!entityDocument) {
      return null;
    }

    const plainObject = entityDocument.toObject({ versionKey: false });
    return NotifyFactory.createEntity(plainObject);
  }

  public async findAllByUserId(
    userId: string,
    readLimit: number,
  ): Promise<NotifyEntity[]> {
    this.logger.log(`Find all by user ID '${userId}'`);

    const unreadNotifies = await this.notifyModel
      .find({ user: userId, isRead: false })
      .sort({ createdAt: -1 });

    const readNotifies = await this.notifyModel
      .find({ user: userId, isRead: true })
      .sort({ createdAt: -1 })
      .limit(readLimit);

    const notifies = [...unreadNotifies, ...readNotifies];
    this.logger.log(
      `Retrieved [${unreadNotifies.length}] new and [${readNotifies.length}] old notifications`,
    );

    return notifies.map((notify) => this.createEntityFromDocument(notify));
  }
}
