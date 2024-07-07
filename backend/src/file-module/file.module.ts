import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FileService } from './file.service';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: FileService,
      useFactory: (config: ConfigService) => {
        const uploadDirectoryPath = config.get<string>('UPLOAD_DIRECTORY_PATH');
        return new FileService(uploadDirectoryPath);
      },
      inject: [ConfigService],
    },
  ],
  exports: [FileService],
})
export class FileModule {}
