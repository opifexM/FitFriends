import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { BaseRepository } from '../../database/base-mongo.repository';
import { TokenEntity } from './token.entity';
import { TokenFactory } from './token.factory';
import { TokenModel } from './token.schema';

@Injectable()
export class TokenRepository extends BaseRepository<TokenEntity> {
  constructor(
    @InjectModel(TokenModel.name) private tokenModel: Model<TokenModel>,
  ) {
    super(tokenModel as any, TokenRepository.name);
  }

  protected createEntityFromDocument(
    entityDocument: Document,
  ): TokenEntity | null {
    if (!entityDocument) {
      return null;
    }

    const plainObject = entityDocument.toObject({ versionKey: false });
    return TokenFactory.createEntity(plainObject);
  }

  public async deleteExpiredTokens(): Promise<boolean> {
    this.logger.log('Attempting to delete expired refresh tokens');
    const result = await this.model.deleteMany({
      expiresIn: { $lt: new Date() },
    });

    return !!result;
  }

  public async deleteByTokenId(tokenId: string): Promise<TokenEntity> {
    this.logger.log(`Attempting to delete refresh token with ID: '${tokenId}'`);
    const deletedToken = await this.model.findOneAndDelete({
      tokenId: tokenId,
    });
    if (!deletedToken) {
      this.logger.warn(`Token with ID ${tokenId} not found for deletion.`);
      throw new NotFoundException(`Token with id '${tokenId}' not found.`);
    }
    this.logger.log(`Successfully deleted token with ID: '${tokenId}'`);

    return this.createEntityFromDocument(deletedToken);
  }

  public async findByTokenId(tokenId: string): Promise<TokenEntity | null> {
    this.logger.log(`Searching for token with ID: '${tokenId}'`);
    const foundToken = await this.model.findOne({ tokenId: tokenId });

    return this.createEntityFromDocument(foundToken);
  }
}
