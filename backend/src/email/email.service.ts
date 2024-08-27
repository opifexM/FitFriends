import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { CreateEmailDto } from 'shared/type/email/dto/create-email.dto';
import { EmailEntity } from './entity/email.entity';
import { EmailFactory } from './entity/email.factory';
import { EmailRepository } from './entity/email.repository';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  constructor(
    private readonly emailRepository: EmailRepository,
    private readonly mailerService: MailerService,
  ) {}

  public async createEmailMessage(dto: CreateEmailDto): Promise<EmailEntity> {
    const { emailTo, emailFrom, topic, text } = dto;
    this.logger.log('Attempting to create email message');

    const emailData = {
      emailTo: emailTo,
      emailFrom: emailFrom,
      topic: topic,
      text: text,
    };

    const emailEntity = EmailFactory.createEntity(emailData);
    const createdEmail = await this.emailRepository.save(emailEntity);
    this.logger.log(`Email message created with ID: '${createdEmail.id}'`);

    return createdEmail;
  }

  public async startEmailSending(): Promise<void> {
    this.logger.log('Start email messages sending');

    const emailMessages = await this.emailRepository.findAll();
    this.logger.log(`Found [${emailMessages.length}] email messages`);

    if (!emailMessages.length) {
      return;
    }

    for (const email of emailMessages) {
      await this.sendEmail(email);
    }

    this.logger.log('Clear email messages');
    await this.emailRepository.clearAll();
  }

  public async sendEmail(email: EmailEntity): Promise<void> {
    this.logger.log(
      `Starting to send email message to new user: '${email.emailTo}'`,
    );
    try {
      await this.mailerService.sendMail({
        from: email.emailFrom,
        to: email.emailTo,
        subject: email.topic,
        html: email.text,
      });
      this.logger.log(`Email message sent successfully to: '${email.emailTo}'`);
    } catch (error) {
      this.logger.error(
        `Failed to send email to: '${email.emailTo}'`,
        error.stack,
      );
    }
  }
}
