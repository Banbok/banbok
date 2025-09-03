import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-oauth2';
import { OAUTH_URLS, OAUTH_SCOPES } from '../../common/constants';

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor(private configService: ConfigService) {
    super({
      authorizationURL: OAUTH_URLS.NAVER.AUTHORIZE,
      tokenURL: OAUTH_URLS.NAVER.TOKEN,
      clientID: configService.get<string>('NAVER_CLIENT_ID'),
      clientSecret: configService.get<string>('NAVER_CLIENT_SECRET'),
      callbackURL: configService.get<string>('NAVER_CALLBACK_URL'),
      scope: OAUTH_SCOPES.NAVER,
    });
  }

  async userProfile(accessToken: string, done: any): Promise<any> {
    try {
      const response = await fetch(OAUTH_URLS.NAVER.PROFILE, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();

      const userInfo = {
        provider: 'naver',
        providerId: data.response.id,
        email: data.response.email,
        name: data.response.name,
        profileImage: data.response.profile_image,
      };

      done(null, userInfo);
    } catch (error) {
      console.error('네이버 프로필 조회 에러:', error);
      done(error, null);
    }
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
  ): Promise<any> {
    return profile;
  }
}
