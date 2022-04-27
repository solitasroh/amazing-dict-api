import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { GameResolver } from './game/game.resolver';
import { GameService } from './game/game.service';
import { S3FileService } from './s3-file/s3-file.service';
import { GameModule } from './game/game.module';
import { S3FileModule } from './s3-file/s3-file.module';

@Module({
  imports: [
    LoginModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    AuthModule,
    UsersModule,
    GameModule,
    S3FileModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    GameResolver,
    GameService,
    S3FileService,
  ],
})
export class AppModule {}
