import { Controller, Logger, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../user/authentication/guard/jwt-auth.guard';
import { EmailService } from './email.service';

@ApiTags('emails')
@Controller('emails')
export class EmailController {
  private readonly logger = new Logger(EmailController.name);

  constructor(private readonly emailService: EmailService) {}

  @Post('initiate-email-dispatch')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Initiate the dispatch of email notifications' })
  @ApiResponse({
    status: 200,
    description: 'All email notifications have been successfully sent.',
  })
  @ApiResponse({ status: 400, description: 'Invalid request.' })
  public async initiateEmailDispatch(): Promise<void> {
    this.logger.log('Initiating the dispatch of email notifications');
    await this.emailService.startEmailSending();
  }
}
