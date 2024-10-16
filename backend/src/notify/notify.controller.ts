import {
  Controller,
  Get,
  Logger,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { fillDto } from 'shared/lib/common';
import { NotifyDto } from 'shared/type/notify/dto/notify.dto';
import { MongoIdValidationPipe } from '../database/mongo-id-validation.pipe';
import { GetUserId } from '../decorator/get-user.decorator';
import { JwtAuthGuard } from '../user/authentication/guard/jwt-auth.guard';
import { NotifyService } from './notify.service';

@ApiTags('notifications')
@Controller('notifications')
export class NotifyController {
  private readonly logger = new Logger(NotifyController.name);

  constructor(private readonly notifyService: NotifyService) {}

  @Get('')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get notification list' })
  @ApiResponse({
    status: 200,
    description: 'The notification list has been successfully retrieved.',
    type: [NotifyDto],
  })
  public async getAllNotificationByUserId(
    @GetUserId() userId: string,
  ): Promise<NotifyDto[]> {
    this.logger.log(`Retrieving notification list for user: '${userId}'`);
    const foundNotifies = await this.notifyService.findAllByUserId(userId);

    return fillDto(
      NotifyDto,
      foundNotifies.map((notify) => notify.toPOJO()),
    );
  }

  @Patch(':notificationId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Read notification by ID' })
  @ApiResponse({
    status: 200,
    description: 'Notification have been successfully read.',
  })
  @ApiResponse({ status: 400, description: 'Invalid request.' })
  public async readNotificationById(
    @Param('notificationId', MongoIdValidationPipe) notificationId: string,
    @GetUserId() userId: string,
  ): Promise<void> {
    this.logger.log('Initiating the dispatch of email notifications');
    await this.notifyService.readNotificationById(userId, notificationId);
  }
}
