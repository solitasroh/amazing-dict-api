import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './guards/google.auth.guard';
import { KakaoAuthGuard } from './guards/kakao.auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(KakaoAuthGuard)
  @Get('/kakao')
  @HttpCode(200)
  authKakao(@Request() req) {
    return HttpStatus.OK;
  }

  @UseGuards(GoogleAuthGuard)
  @Get('/google')
  @HttpCode(200)
  authGoogle(@Request() req) {
    return HttpStatus.OK;
  }

  @UseGuards(KakaoAuthGuard)
  @Get('/kakao/redirect')
  authKakaoLogin(@Request() req) {
    return this.authService.kakaoLogin(req);
  }

  @UseGuards(GoogleAuthGuard)
  @Get('/google/redirect')
  authGoogleLogin(@Request() req) {
    return this.authService.googleLogin(req);
  }
}
