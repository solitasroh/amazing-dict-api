import { Injectable } from '@nestjs/common';
import { LoginResult } from './loginResult.model';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class LoginService {
  constructor(private httpService: HttpService) {}
  async login(): Promise<LoginResult> {
    console.log('request login..');
    const url =
      'kauth.kakao.com/oauth/authorize?response_type=code&client_id=$eeba2d100c4ae0715251c9ec67368d4d&redirect_uri=${http://localhost:3000/}';
    const resp = this.httpService.get(url);
    //
    resp.subscribe((x) => {
      console.log('test');
    });

    const result = new LoginResult();
    result.accessToken = 'success';
    result.redirectUrl = 'localhost:3000';
    result.refreshToken = 'refreshToken';
    return Promise.resolve(result);
  }
}
