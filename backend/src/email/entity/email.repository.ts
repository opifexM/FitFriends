import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { BaseRepository } from '../../database/base-mongo.repository';
import { EmailEntity } from './email.entity';
import { EmailFactory } from './email.factory';
import { EmailModel } from './email.schema';

@Injectable()
export class EmailRepository extends BaseRepository<EmailEntity> {
  constructor(
    @InjectModel(EmailModel.name)
    private emailModel: Model<EmailModel>,
  ) {
    super(emailModel as any, EmailRepository.name);
  }

  protected createEntityFromDocument(
    entityDocument: Document,
  ): EmailEntity | null {
    if (!entityDocument) {
      return null;
    }

    const plainObject = entityDocument.toObject({ versionKey: false });
    return EmailFactory.createEntity(plainObject);
  }

  public async findAll(): Promise<EmailEntity[]> {
    this.logger.log('Find all emails messages');
    const documents = await this.emailModel.find().sort({ createdAt: -1 });

    return documents.map((doc) => this.createEntityFromDocument(doc));
  }

  public async clearAll(): Promise<void> {
    this.logger.log('Deleting all emails messages');
    await this.emailModel.deleteMany({});
  }
}
