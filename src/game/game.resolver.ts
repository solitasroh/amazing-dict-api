import {
  Args,
  Resolver,
  Query,
  Mutation,
  Context,
  InputType,
  Field,
  Int,
} from '@nestjs/graphql';
import { Game } from './game';
import { GameService } from './game.service';
import { S3FileService } from '../s3-file/s3-file.service';
import * as fs from 'fs';

@InputType()
class GameCreateInput {
  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  singer: string;

  @Field({ nullable: true })
  preSectionLyrics: string;

  @Field({ nullable: true })
  postSectionLyrics: string;

  @Field({ nullable: true })
  questionLyrics: string;

  @Field({ nullable: true })
  prePlaySection: string;

  @Field({ nullable: true })
  playTime: string;

  @Field((type) => Int, { nullable: true })
  preSectionPlayStartTime: number;

  @Field((type) => Int, { nullable: true })
  preSectionPlayEndTime: number;

  @Field((type) => Int, { nullable: true })
  questionSectionPlayStartTime: number;

  @Field((type) => Int, { nullable: true })
  questionSectionPlayEndTime: number;

  @Field({ nullable: true })
  songYoutubeLinkUrl: string;
}

@Resolver(Game)
export class GameResolver {
  constructor(
    private gamesService: GameService,
    private s3Service: S3FileService,
  ) {}

  @Query((returns) => Game, { name: 'game' })
  async game(@Args('id') id: number): Promise<Game> {
    console.log('get game');
    return new Game();
  }

  @Mutation((returns) => Game)
  async createCame(@Args('data') data: GameCreateInput, @Context() ctx) {
    const linkS3 = await this.gamesService.makeMp3(data.songYoutubeLinkUrl);
    console.log(linkS3);
    return this.gamesService.createGame();
  }
}
