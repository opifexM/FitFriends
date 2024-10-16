import {
  forwardRef,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateNotifyDto } from 'shared/type/notify/dto/create-notify.dto';
import { NOTIFY_LIST } from 'shared/type/notify/noify.constant';
import { USER_MESSAGES } from '../user/user.constant';
import { UserService } from '../user/user.service';
import { NotifyEntity } from './entity/notify.entity';
import { NotifyFactory } from './entity/notify.factory';
import { NotifyRepository } from './entity/notify.repository';
import { NOTIFY_MESSAGES } from './notify.constant';

@Injectable()
export class NotifyService {
  private readonly logger = new Logger(NotifyService.name);

  constructor(
    private readonly notifyRepository: NotifyRepository,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  public async createNotifyMessage(
    userId: string,
    dto: CreateNotifyDto,
  ): Promise<NotifyEntity> {
    const { topic, text } = dto;
    this.logger.log(
      `Attempting to create '${topic}' notify message for user '${userId}'`,
    );

    const notifyData = {
      user: userId,
      topic: topic,
      text: text,
      isRead: false,
    };

    const notifyEntity = NotifyFactory.createEntity(notifyData);
    const createdNotify = await this.notifyRepository.save(notifyEntity);
    this.logger.log(`Notify message created with ID: '${createdNotify.id}'`);

    return createdNotify;
  }

  public async findAllByUserId(userId: string): Promise<NotifyEntity[]> {
    this.logger.log(`Looking for all notifications by userID: '${userId}'`);

    const foundUser = await this.userService.findUserById(userId);
    if (!foundUser) {
      this.logger.warn(`User with id '${userId}' not found`);
      throw new NotFoundException(USER_MESSAGES.NOT_FOUND);
    }

    return await this.notifyRepository.findAllByUserId(
      foundUser.id,
      NOTIFY_LIST.READIED_LIMIT,
    );
  }

  public async readNotificationById(
    userId: string,
    notifyId: string,
  ): Promise<NotifyEntity> {
    this.logger.log(`Set notification '${userId}' as read`);
    const foundNotify = await this.notifyRepository.findById(notifyId);
    if (!foundNotify) {
      this.logger.warn(`Notification with id '${notifyId}' not found`);
      throw new NotFoundException(NOTIFY_MESSAGES.NOT_FOUND);
    }
    if (foundNotify.user.toString() !== userId) {
      this.logger.warn(
        `User with id '${userId}' don't have access to notification '${notifyId}'`,
      );
      throw new NotFoundException(NOTIFY_MESSAGES.NO_ACCESS);
    }
    foundNotify.isRead = true;

    return this.notifyRepository.update(foundNotify.id, foundNotify);
  }
}
