import { Module } from '@nestjs/common';
import { GameResolver } from './game.resolver';
import { S3FileService } from '../s3-file/s3-file.service';
import { S3FileModule } from '../s3-file/s3-file.module';
import { GameService } from './game.service';

@Module({
  imports: [S3FileModule],
  providers: [GameResolver, S3FileService, GameService],
})
export class GameModule {}
