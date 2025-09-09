import { COOKIE_CONFIG } from '../constants';
import { ConfigService } from '@nestjs/config';

export const getCommonCookieOptions = (configService: ConfigService) => {
  return {
    httpOnly: true,
    secure: configService.get<string>('NODE_ENV') === 'production',
    sameSite: COOKIE_CONFIG.SAME_SITE,
    path: '/',
  };
};
