import { Controller, Get, Request, Res, UseGuards } from '@nestjs/common';
import { NaverAuthGuard } from './guards/naver-auth.guard';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { COOKIE_CONFIG } from '../common/constants';
import { AuthControllerSwagger, NaverLoginSwagger } from './swagger';
import { ApiPath } from '../api-path';

@Controller()
@AuthControllerSwagger
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {
  }

  @NaverLoginSwagger
  @UseGuards(NaverAuthGuard)
  @Get(ApiPath.Auth.NAVER_LOGIN)
  async naverLogin() {
    // 네이버 로그인 페이지로 리다이렉트
  }

  @UseGuards(NaverAuthGuard)
  @Get(ApiPath.Auth.NAVER_CALLBACK)
  async naverCallback(@Request() req, @Res() res: Response) {
    const result = await this.authService.validateOAuthUser(req.user);

    // HttpOnly 쿠키로 토큰 설정
    res.cookie('accessToken', result.accessToken, {
      httpOnly: true, // XSS 방지 (JavaScript로 접근 불가)
      secure: this.configService.get<string>('NODE_ENV') === 'production',
      sameSite: COOKIE_CONFIG.SAME_SITE, // CSRF 방지
      maxAge: COOKIE_CONFIG.MAX_AGE, // 1일
      path: '/',
    });

    const redirectUrl = `${this.configService.get<string>('FRONTEND_URL')}/`;

    res.redirect(redirectUrl);
  }
}
