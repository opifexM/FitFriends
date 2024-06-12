import { Logger, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';

export abstract class BaseRepository<T> {
  protected readonly logger: Logger;

  protected constructor(
    protected readonly model: Model<T & Document>,
    repositoryName: string,
  ) {
    this.logger = new Logger(repositoryName);
  }

  protected abstract createEntityFromDocument(entityDocument: any): T | null;

  public async save(entity: T): Promise<T> {
    this.logger.log(`Saving new entity...`);
    const newEntity = new this.model((entity as any).toPOJO());
    const savedEntity = await newEntity.save();
    newEntity.id = savedEntity.id;
    this.logger.log(`Entity saved with ID: '${savedEntity.id}'`);

    return this.createEntityFromDocument(newEntity);
  }

  public async findById(id: string): Promise<T | null> {
    this.logger.log(`Finding document by ID: '${id}'`);
    const foundDocument = await this.model.findById(new ObjectId(id));

    return this.createEntityFromDocument(foundDocument);
  }

  public async update(id: string, entity: T): Promise<T> {
    this.logger.log(`Updating entity by ID: '${id}'`);
    const updatedDocument = await this.model.findByIdAndUpdate(
      new ObjectId(id),
      (entity as any).toPOJO(),
      { new: true },
    );
    if (!updatedDocument) {
      this.logger.error(`Entity not found for update: ID ${id}`);
      throw new NotFoundException(
        `Entity with id ${(entity as any).id} not found`,
      );
    }

    return this.createEntityFromDocument(updatedDocument);
  }

  public async deleteById(id: string): Promise<T> {
    this.logger.log(`Deleting entity by ID: '${id}'`);
    const deletedDocument = await this.model.findByIdAndDelete(
      new ObjectId(id),
    );
    if (!deletedDocument) {
      this.logger.error(`Entity not found for deletion: ID ${id}`);
      throw new NotFoundException(`Entity with id ${id} not found.`);
    }

    return this.createEntityFromDocument(deletedDocument);
  }

  public async exists(id: string): Promise<boolean> {
    const result = await this.model.exists(new ObjectId(id));

    return !!result;
  }
}
