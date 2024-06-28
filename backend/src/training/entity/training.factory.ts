import { Logger } from '@nestjs/common';
import { TrainingEntity } from './training.entity';

export class TrainingFactory {
  private static readonly logger = new Logger(TrainingFactory.name);

  public static createEntity(plainObject: any): TrainingEntity {
    return new TrainingEntity(plainObject);
  }
}
