import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginResult {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;

  @Field()
  redirectUrl: string;
}
