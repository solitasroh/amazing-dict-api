import { Profile, Strategy } from 'passport-kakao';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { KakaoProfileDto } from './dto/kakao-profile.dto';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
      callbackURL: process.env.KAKAO_CLIENT_REDIRECT,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done,
  ): Promise<any> {
    console.log(accessToken);
    console.log(refreshToken);

    const user: KakaoProfileDto = {
      nickname: profile._json.kakao_account.profile.nickname,
      id: profile.id,
      thumbnail_image_url:
        profile._json.kakao_account.profile.thumbnail_image_url,
      profile_image_url: profile._json.kakao_account.profile.profile_image_url,
    };

    done(null, user);
  }
}
