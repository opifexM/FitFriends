import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserEntity } from '../../entity/user.entity';
import { UserService } from '../../user.service';

const USERNAME_FIELD_NAME = 'email';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(LocalStrategy.name);

  constructor(private readonly userService: UserService) {
    super({
      usernameField: USERNAME_FIELD_NAME,
    });
  }

  public async validate(email: string, password: string): Promise<UserEntity> {
    this.logger.log(`Authenticating user with email: ${email} and password`);
    return this.userService.verifyUser({ email, password });
  }
}
