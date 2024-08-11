import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { writeFile } from 'node:fs/promises';
import * as path from 'node:path';
import { extname } from 'path';
import { FILE_MESSAGES } from './file.constant';

@Injectable()
export class FileService {
  private readonly logger = new Logger(FileService.name);

  constructor(private readonly uploadDirectoryPath: string) {}

  private generateUniqueFilename(originalFilename: string): string {
    const fileExtension = originalFilename.split('.').pop();
    const uniqueName = crypto.randomUUID();
    const uniqueFilename = `${uniqueName}.${fileExtension}`;
    this.logger.log(`Generated unique filename: '${uniqueFilename}'`);

    return uniqueFilename;
  }

  public async uploadFile(
    file: Express.Multer.File,
    allowedFormats: string[],
    maxSizeKb: number,
  ): Promise<string> {
    if (!file) {
      return;
    }
    const fileExtension = extname(file.originalname).toLowerCase();
    if (!fileExtension) {
      this.logger.warn(`Unknown file type received: ${file.mimetype}`);
      throw new BadRequestException(FILE_MESSAGES.UNKNOWN_TYPE);
    }
    if (!allowedFormats.includes(fileExtension)) {
      this.logger.warn(
        `Unsupported file type attempt: '${fileExtension}', allowed: '${allowedFormats}'`,
      );
      throw new BadRequestException(FILE_MESSAGES.UNSUPPORTED_TYPE);
    }
    const fileSizeKb = file.size / 1024;
    if (fileSizeKb > maxSizeKb) {
      this.logger.warn(
        `File size too large: ${fileSizeKb}Kb, maximum allowed: ${maxSizeKb}Kb`,
      );
      throw new BadRequestException(FILE_MESSAGES.FILE_TOO_LARGE);
    }

    const uniqueFilename = this.generateUniqueFilename(file.originalname);
    const filePath = path.join(this.uploadDirectoryPath, uniqueFilename);
    try {
      this.logger.log(`Uploading file to: '${filePath}'`);
      await writeFile(filePath, file.buffer);
      this.logger.log(`File uploaded successfully: '${uniqueFilename}'`);
    } catch (error) {
      this.logger.error(`Failed to upload file: ${error.message}`, error.stack);
      throw error;
    }

    return uniqueFilename;
  }
}
