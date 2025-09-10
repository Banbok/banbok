import { Controller, Get, Post, Request, Res, UseGuards } from '@nestjs/common';
import { NaverAuthGuard } from '../guards/naver-auth.guard';
import { Response } from 'express';
import { AuthService } from '../service/auth.service';
import { ConfigService } from '@nestjs/config';
import { COOKIE_CONFIG } from '../../common/constants';
import { AuthControllerSwagger, LogoutSwagger, NaverLoginSwagger } from '../swagger';
import { ApiPath } from '../../api-path';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { getCommonCookieOptions } from '../../common/util';

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
      ...getCommonCookieOptions(this.configService),
      maxAge: COOKIE_CONFIG.MAX_AGE, // 1일
    });

    const redirectUrl = `${this.configService.get<string>('FRONTEND_URL')}?accessToken=${result.accessToken}`;

    res.redirect(redirectUrl);
  }

  @LogoutSwagger
  @Post(ApiPath.Auth.LOGOUT)
  @UseGuards(JwtAuthGuard)
  async logout(@Res() res: Response) {
    res.clearCookie('accessToken', {
      ...getCommonCookieOptions(this.configService),
    });
    res.sendStatus(200);
  }
}
