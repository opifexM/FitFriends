import { Injectable, Logger } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcrypt';

@Injectable()
export class BcryptCrypto {
  private readonly logger = new Logger(BcryptCrypto.name);

  constructor(private readonly saltRounds: number) {}

  public async hashPassword(password: string): Promise<string> {
    this.logger.log(`Generating salt and hashing password`);
    const salt = await genSalt(this.saltRounds);
    return hash(password, salt);
  }

  public async verifyPassword(
    inputPassword: string,
    storedHash: string,
  ): Promise<boolean> {
    this.logger.log(`Verifying password...`);
    return compare(inputPassword, storedHash);
  }
}
