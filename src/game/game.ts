import { Field, Int, ObjectType } from '@nestjs/graphql';
import { GraphQLString } from 'graphql';

@ObjectType()
export class Game {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  singer: string;

  @Field()
  preSectionLyrics: string;
  @Field()
  postSectionLyrics: string;
  @Field()
  questionLyrics: string;
  @Field()
  prePlaySection: string;
  @Field((type) => Int)
  preSectionPlayStartTime: number;
  @Field((type) => Int)
  preSectionPlayEndTime: number;
  @Field((type) => Int)
  questionSectionPlayStartTime: number;
  @Field((type) => Int)
  questionSectionPlayEndTime: number;
  @Field()
  songYoutubeLinkUrl: string;
  @Field()
  musicFileLinkUrl: string;
}
