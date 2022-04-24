import { Resolver, Query } from '@nestjs/graphql';
import { LoginService } from './login.service';
import { LoginResult } from './loginResult.model';

@Resolver(() => LoginResult)
export class LoginResolver {
  constructor(private loginService: LoginService) {}

  @Query(() => LoginResult)
  async Login() {
    console.log('login resolver...');
    return await this.loginService.login();
  }
}
